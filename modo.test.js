const { Root, Table, ButtonContainer, LinkButton, Detail } = require("./modo");

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
            external: ""
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
    expect(LinkButton({ title: "", external: "" }).elementType).toBe(
      "linkButton"
    );
  });

  it("includes provided title", () => {
    expect(LinkButton({ title: "Title", external: "" }).title).toBe("Title");
  });

  describe("link", () => {
    it("includes external link if provided", () => {
      expect(
        LinkButton({ title: "", external: "https://brown.edu" }).link.external
      ).toBe("https://brown.edu");
    });

    it("includes authority link if requested", () => {
      expect(LinkButton({ title: "", authority: true }).link).toEqual({
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
