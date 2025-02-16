import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import {unified} from "unified";

export default async function MarkdownContent({text}: {text: string}) {
    const content = (
        await unified()
            .use(remarkParse)
            .use(remarkHtml)
            .process(text)
    ).toString()

    // XSS is not a concern: https://github.com/remarkjs/remark-html#Security
    return (
        <div dangerouslySetInnerHTML={{__html: content}}/>
    )
}