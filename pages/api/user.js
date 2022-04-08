import { API_URL } from "../../config";
import cookie from "cookie";

export default async function user(req, res) {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await strapiRes.json();

    console.log(user);

    if (strapiRes.ok) {
      res.status(200).json(user);
    } else {
      res.status(403).json({ message: `User forbidden` });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
