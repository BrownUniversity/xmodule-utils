function Root({ children, version = "1" }) {
  return {
    metadata: {
      version
    },
    content: children
  };
}

function Container({ id, content, margins = "responsive", hidden = false }) {
  return {
    elementType: "container",
    margins: {
      value: margins
    },
    id,
    content,
    hidden
  };
}

function Heading({ text }) {
  return {
    elementType: "heading",
    title: text
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

function AuthorityLink() {
  return { authority: { type: "default" } };
}

function ExternalLink({ external }) {
  return {
    external,
    accessoryIcon: "drilldown"
  };
}

function ModuleLink({ id, page, queryParameters }) {
  return {
    module: {
      id,
      page,
      queryParameters
    }
  };
}

function LinkButton({ title, link }) {
  return {
    elementType: "linkButton",
    title,
    link,
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

function ListItem({ label, description, url }) {
  return {
    label,
    description,
    link: {
      external: url
    }
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
  Container,
  Heading,
  Table,
  LinkButton,
  ButtonContainer,
  Detail,
  List,
  ListItem,
  HTML,
  AuthorityLink,
  ExternalLink,
  ModuleLink
};
