const {
  Root,
  Container,
  Heading,
  Table,
  Collapsible,
  ButtonContainer,
  LinkButton,
  Detail,
  List,
  ListItem,
  HTML,
  Form,
  Checkbox,
  Select,
  FormButton,
  AuthorityLink,
  ExternalLink,
  ModuleLink,
  RelativeLink,
  XModuleLink
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

describe("Container", () => {
  it("includes container elementType", () => {
    expect(Container({ id: "", content: [] }).elementType).toBe("container");
  });

  it("includes provided margin type (with responsive default)", () => {
    expect(Container({ id: "", content: [] }).margins.value).toBe("responsive");
    expect(
      Container({ id: "", content: [], margins: "minimal" }).margins.value
    ).toBe("minimal");
  });

  it("includes provided hidden state (with false default)", () => {
    expect(Container({ id: "", content: [] }).hidden).toBe(false);
    expect(Container({ id: "", content: [], hidden: false }).hidden).toBe(
      false
    );
    expect(Container({ id: "", content: [], hidden: true }).hidden).toBe(true);
  });

  it("includes provided id", () => {
    expect(Container({ id: "element-id", content: [] }).id).toBe("element-id");
  });

  it("includes provided content as content array", () => {
    expect(
      Container({ id: "", content: ["item 1", "item 2"] }).content
    ).toEqual(["item 1", "item 2"]);
  });
});

describe("Heading", () => {
  it("includes heading elementType", () => {
    expect(Heading({ text: "" }).elementType).toBe("heading");
  });

  it("includes provided text as title", () => {
    expect(Heading({ text: "heading text" }).title).toBe("heading text");
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

describe("Collapsible", () => {
  it("includes collapsible element type", () => {
    expect(
      Collapsible({ title: "", content: [], collapsed: true }).elementType
    ).toBe("collapsible");
  });

  it("defaults to collapsed state", () => {
    expect(Collapsible({ title: "", content: [] }).collapsed).toBe(true);
  });

  it("includes provided title", () => {
    expect(
      Collapsible({ title: "Element title", content: [], collapsed: true })
        .title
    ).toBe("Element title");
  });

  it("includes provided content", () => {
    expect(
      Collapsible({
        title: "",
        content: ["child 1", "child 2"],
        collapsed: true
      })
    ).toEqual(
      expect.objectContaining({
        content: ["child 1", "child 2"]
      })
    );
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

describe("Detail", () => {
  it("includes detail element type", () => {
    expect(Detail({ subtitle: "" }).elementType).toBe("detail");
  });

  it("includes provided subtitle", () => {
    expect(Detail({ subtitle: "Test subtitle" }).subtitle).toBe(
      "Test subtitle"
    );
  });

  it("includes provided body", () => {
    expect(Detail({ body: "Test body" }).body).toBe("Test body");
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

  it("includes provided title", () => {
    expect(ListItem({ title: "Test title" }).title).toBe("Test title");
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

describe("Form", () => {
  it("includes form element type", () => {
    expect(Form({ path: "", children: [] }).elementType).toBe("form");
  });

  it("includes provided path", () => {
    expect(Form({ path: "path/to/form", children: [] }).relativePath).toBe(
      "path/to/form"
    );
  });

  it("includes provided children in items array", () => {
    expect(Form({ children: ["child 1", "child 2"], path: "" })).toEqual(
      expect.objectContaining({
        items: ["child 1", "child 2"]
      })
    );
  });

  it("includes empty events array by default", () => {
    expect(Form({ path: "", children: [] }).events).toEqual([]);
  });

  it("includes success event with target if target id is provided", () => {
    expect(
      Form({ path: "", children: [], successTarget: "successId" }).events
    ).toEqual([
      {
        eventName: "success",
        action: "show",
        targetId: "successId"
      }
    ]);
  });
});

describe("Checkbox", () => {
  it("includes input elementType", () => {
    expect(Checkbox({ name: "", label: "" }).elementType).toBe("input");
  });

  it("includes provided name", () => {
    expect(Checkbox({ name: "element-name", label: "" }).name).toBe(
      "element-name"
    );
  });

  it("includes provided label", () => {
    expect(Checkbox({ label: "element-label", name: "" }).label).toBe(
      "element-label"
    );
  });

  it("includes provided checked state (with false default)", () => {
    expect(Checkbox({ name: "", label: "" }).checked).toBe(false);
    expect(Checkbox({ name: "", label: "", checked: false }).checked).toBe(
      false
    );
    expect(Checkbox({ name: "", label: "", checked: true }).checked).toBe(true);
  });

  it("includes provided progressiveDisclosureItems (with empty default)", () => {
    expect(
      Checkbox({ name: "", label: "" }).progressiveDisclosureItems
    ).toStrictEqual({});
    expect(
      Checkbox({ name: "", label: "", progressiveDisclosureItems: {} })
        .progressiveDisclosureItems
    ).toStrictEqual({});
    expect(
      Checkbox({
        name: "",
        label: "",
        progressiveDisclosureItems: {
          unchecked: [Heading({ text: "Test heading" })]
        }
      }).progressiveDisclosureItems
    ).toEqual(
      expect.objectContaining({
        unchecked: [{ elementType: "heading", title: "Test heading" }]
      })
    );
  });
});

describe("Select", () => {
  it("includes input elementType", () => {
    expect(Select({ name: "", label: "" }).elementType).toBe("input");
  });

  it("includes provided name", () => {
    expect(Select({ name: "select-name", label: "" }).name).toBe("select-name");
  });

  it("includes provided label", () => {
    expect(Select({ label: "select-label", name: "" }).label).toBe(
      "select-label"
    );
  });

  it("includes provided option labels", () => {
    expect(
      Select({
        name: "",
        label: "",
        optionLabels: ["Label 1", "Label 2"],
        optionValues: []
      }).optionLabels
    ).toEqual(["Label 1", "Label 2"]);
  });

  it("includes provided option values", () => {
    expect(
      Select({
        name: "",
        label: "",
        optionValues: ["Value 1", "Value 2"],
        optionLabels: []
      }).optionValues
    ).toEqual(["Value 1", "Value 2"]);
  });

  it("includes provided value (with null as default)", () => {
    expect(Select({ name: "", label: "" }).value).toBe(null);
    expect(Select({ name: "", label: "", value: null }).value).toBe(null);
    expect(Select({ name: "", label: "", value: "selected-value" }).value).toBe(
      "selected-value"
    );
  });

  it("includes provided required state (with false as default)", () => {
    expect(Select({ name: "", label: "" }).required).toBe(false);
    expect(Select({ name: "", label: "", required: false }).required).toBe(
      false
    );
    expect(Select({ name: "", label: "", required: true }).required).toBe(true);
  });
});

describe("FormButton", () => {
  it("includes formButton elementType", () => {
    expect(FormButton({ text: "" }).elementType).toBe("formButton");
  });

  it("includes submit buttonType", () => {
    expect(FormButton({ text: "" }).buttonType).toBe("submit");
  });

  it("includes constructive actionType", () => {
    expect(FormButton({ text: "" }).actionType).toBe("constructive");
  });

  it("includes provided text as title", () => {
    expect(FormButton({ text: "Button Text" }).title).toBe("Button Text");
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

  it("includes provided accessoryIcon (with drilldown default)", () => {
    expect(ExternalLink({ external: "https://brown.edu" }).accessoryIcon).toBe(
      "drilldown"
    );
    expect(
      ExternalLink({ external: "https://brown.edu", accessoryIcon: "external" })
        .accessoryIcon
    ).toBe("external");
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

describe("RelativeLink", () => {
  it("includes provided path", () => {
    expect(RelativeLink({ path: "/../relative-path" }).relativePath).toBe(
      "/../relative-path"
    );
  });
});

describe("XModuleLink", () => {
  it("includes provided id", () => {
    expect(XModuleLink({ id: "module_id", path: "" }).xmodule.id).toBe(
      "module_id"
    );
  });

  it("includes provided path", () => {
    expect(
      XModuleLink({ id: "", path: "/../relative-path" }).xmodule.relativePath
    ).toBe("/../relative-path");
  });
});
