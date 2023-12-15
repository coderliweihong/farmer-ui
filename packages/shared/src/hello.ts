/**
 * hello测试方法
 * @param to
 */
export function hello(to: string = 'World') {
    const txt = `Hello ${to}!`;
    alert(txt);
    return txt;
}
