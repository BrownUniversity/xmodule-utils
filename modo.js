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


/**
 *
 * @param external
 * @param authority
 * @returns {{authority: {type: string}}|{external: *, accessoryIcon: string}}
 * @deprecated
 */
function link({ external, authority, module }) {
  if (authority) {
    return AuthorityLink();
  }

  if (module) {
    const { id, page, queryParameters } = module;
    return ModuleLink( {id, page, queryParameters} );
  }

  return ExternalLink({ external });

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
