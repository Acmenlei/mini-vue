const htmlTags = {}

for (let tag of [
        "p",
        "span",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "header",
        "footer",
        "section",
        "code",
        "pre",
        "article",
        "div",
        "button",
        "input",
        "script",
        "head",
        "meta",
        "html",
        "body",
        "input"
    ]) {
    htmlTags[tag] = true;
}

export default htmlTags;