import Cookie from "cookie";

export default function (req, res) {
    res.setHeader("Set-Cookie", Cookie.serialize("token", "", {
        httpOnly:true, 
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path:"/admin",
    }));
    res.statusCode=200; 
    res.json({success: true});
}