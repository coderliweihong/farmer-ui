/**
 * [hello description]
 * @param    {number = 'World'} to [description]
 * @author   codefarmer
 * @version  [1.0.0]
 * @datetime 2023-12-19T09:25:41+0800
 */
export function hello(to: string = 'World') {
    const txt = `Hello ${to}!`;
    alert(txt);
    return txt;
}
