const {
  Root,
  Table,
  ButtonContainer,
  LinkButton,
  Detail,
  List,
  ListItem,
  HTML,
  AuthorityLink,
  ExternalLink,
  ModuleLink
} = require("./modo");

describe("Root", () => {
  it("includes default version (1) in metadata", () => {
    expect(Root({ children: [] })).toEqual(
      expect.objectContaining({
        metadata: {
          version: "1"
        }
      })
    );
  });

  it("includes provided children in content array", () => {
    expect(Root({ children: ["child 1", "child 2"] })).toEqual(
      expect.objectContaining({
        content: ["child 1", "child 2"]
      })
    );
  });
});

describe("Table", () => {
  it("includes table element type", () => {
    expect(
      Table({
        heading: "",
        headers: [],
        rows: []
      }).elementType
    ).toBe("table");
  });

  it("includes provided heading", () => {
    expect(
      Table({
        heading: "Table Heading",
        headers: [],
        rows: []
      }).heading
    ).toBe("Table Heading");
  });

  it("maps provided headers to columnOptions", () => {
    expect(
      Table({
        heading: "",
        headers: ["Header 1", "Header 2", "Header 3"],
        rows: []
      }).columnOptions
    ).toEqual([
      { header: "Header 1" },
      { header: "Header 2" },
      { header: "Header 3" }
    ]);
  });

  it("maps row content to cells with titles", () => {
    expect(
      Table({
        heading: "",
        headers: [],
        rows: [["Cell 1", "Cell 2"], ["Cell 3", null]]
      }).rows
    ).toEqual([
      { cells: [{ title: "Cell 1" }, { title: "Cell 2" }] },
      { cells: [{ title: "Cell 3" }, { title: "" }] }
    ]);
  });
});

describe("ButtonContainer", () => {
  it("includes buttonContainer element type", () => {
    expect(ButtonContainer({ buttons: [] }).elementType).toBe(
      "buttonContainer"
    );
  });

  it("includes provided buttons", () => {
    expect(
      ButtonContainer({
        buttons: [
          LinkButton({
            title: "",
            link: ExternalLink({ external: "" })
          })
        ]
      }).buttons
    ).toEqual([
      {
        elementType: "linkButton",
        title: "",
        link: {
          external: "",
          accessoryIcon: "drilldown"
        },
        accessoryIconPosition: "right"
      }
    ]);
  });
});

describe("LinkButton", () => {
  it("includes linkButton element type", () => {
    expect(
      LinkButton({ title: "", link: ExternalLink({ external: "" }) })
        .elementType
    ).toBe("linkButton");
  });

  it("includes provided title", () => {
    expect(
      LinkButton({ title: "Title", link: ExternalLink({ external: "" }) }).title
    ).toBe("Title");
  });

  describe("link", () => {
    it("includes external link if provided", () => {
      expect(
        LinkButton({
          title: "",
          link: ExternalLink({ external: "https://brown.edu" })
        }).link.external
      ).toBe("https://brown.edu");
    });

    it("includes authority link if requested", () => {
      expect(LinkButton({ title: "", link: AuthorityLink() }).link).toEqual({
        authority: {
          type: "default"
        }
      });
    });
  });
});

describe("Detail", () => {
  it("includes detail element type", () => {
    expect(Detail({ subtitle: "" }).elementType).toBe("detail");
  });

  it("includes provided subtitle", () => {
    expect(Detail({ subtitle: "Test subtitle" }).subtitle).toBe(
      "Test subtitle"
    );
  });

  it("includes provided children in content array", () => {
    expect(Detail({ children: ["child 1", "child 2"] })).toEqual(
      expect.objectContaining({
        content: ["child 1", "child 2"]
      })
    );
  });
});

describe("List", () => {
  it("includes list element type", () => {
    expect(List({ heading: "" }).elementType).toBe("list");
  });

  it("includes provided heading", () => {
    expect(List({ heading: "Test heading" }).heading).toBe("Test heading");
  });

  it("includes provided items in items array", () => {
    expect(List({ items: ["item 1", "item 2"] })).toEqual(
      expect.objectContaining({
        items: ["item 1", "item 2"]
      })
    );
  });
});

describe("ListItem", () => {
  it("includes provided label", () => {
    expect(ListItem({ label: "Test Label" }).label).toBe("Test Label");
  });

  it("includes provided description", () => {
    expect(ListItem({ description: "Test description" }).description).toBe(
      "Test description"
    );
  });

  it("includes provided url", () => {
    expect(ListItem({ url: "https://brown.edu" }).link).toEqual(
      expect.objectContaining({ external: "https://brown.edu" })
    );
  });
});

describe("HTML", () => {
  it("includes html element type", () => {
    expect(HTML({ content: "" }).elementType).toBe("html");
  });

  it("sets inset to false", () => {
    expect(HTML({ content: "" }).inset).toBe(false);
  });

  it("includes provided content as html property", () => {
    expect(HTML({ content: "<span>THIS HERE BE CONTENT</span>" }).html).toBe(
      "<span>THIS HERE BE CONTENT</span>"
    );
  });
});

describe("AuthorityLink", () => {
  it("includes default type", () => {
    expect(AuthorityLink().authority.type).toBe("default");
  });
});

describe("ExternalLink", () => {
  it("includes provided url", () => {
    expect(ExternalLink({ external: "https://brown.edu" }).external).toBe(
      "https://brown.edu"
    );
  });
});

describe("ModuleLink", () => {
  const module = {
    id: "link id",
    page: "page name",
    queryParameters: { search: "Search", filter: "filter string" }
  };

  it("includes provided id", () => {
    expect(ModuleLink(module).module.id).toBe("link id");
  });
  it("includes provided page name", () => {
    expect(ModuleLink(module).module.page).toBe("page name");
  });
  it("includes provided search name", () => {
    expect(ModuleLink(module).module.queryParameters.search).toBe("Search");
  });
  it("includes provided filter string", () => {
    expect(ModuleLink(module).module.queryParameters.filter).toBe(
      "filter string"
    );
  });
});
