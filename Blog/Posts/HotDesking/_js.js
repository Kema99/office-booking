import * as BlogGenerics from "../../GenericMethods/_js.js"

window.onload = async () => {
    BlogGenerics.loadBody()
    await BlogGenerics.loadPostMain()
}