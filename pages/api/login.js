import cookie from "cookie";

function login (req, res) {
    res.setHeader("Set-Cookie", cookie.serialize("token", req.body.token, {
        httpOnly:true, 
        secure: process.env.NODE_ENV !== "development",
        maxAge : 60 * 15,
        sameSite: "strict",
        path:"/blog",
    }));
    res.statusCode=200; 
    res.json({success: true});
}
export default login;