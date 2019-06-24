function Root({ children, version = "1" }) {
  return {
    metadata: {
      version
    },
    content: children
  };
}

function Table({ heading, headers, rows }) {
  return {
    elementType: "table",
    heading,
    columnOptions: headers.map(h => ({ header: h })),
    rows: rows.map(r => ({
      cells: r.map(c => ({ title: (c || "").toString() }))
    }))
  };
}

function ButtonContainer({ buttons }) {
  return {
    elementType: "buttonContainer",
    buttons
  };
}

function LinkButton({ title, external }) {
  return {
    elementType: "linkButton",
    title,
    link: {
      external,
      accessoryIcon: "drilldown"
    },
    accessoryIconPosition: "right"
  };
}

module.exports = {
  Root,
  Table,
  LinkButton,
  ButtonContainer
};
