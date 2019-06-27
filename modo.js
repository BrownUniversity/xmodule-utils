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

function link({ external, authority }) {
  if (authority) {
    return { authority: { type: "default" } };
  }

  return {
    external,
    accessoryIcon: "drilldown"
  };
}

function LinkButton({ title, external, authority = false }) {
  return {
    elementType: "linkButton",
    title,
    link: link({ external, authority }),
    accessoryIconPosition: "right"
  };
}

function Detail({ subtitle, children = [] }) {
  return {
    elementType: "detail",
    subtitle,
    content: children
  };
}

function List({ heading, items = [], grouped = true }) {
  return {
    elementType: "list",
    grouped,
    heading,
    items
  };
}

function HTML({ content }) {
  return {
    elementType: "html",
    inset: false,
    html: content
  };
}

module.exports = {
  Root,
  Table,
  LinkButton,
  ButtonContainer,
  Detail,
  List,
  HTML
};
