import http from "k6/http";
import { sleep } from "k6";

export const options = {
    vus: 100000, // virtual users
    duration: "30s",
};

export default function () {
    http.get("https://ipick-server-app-873909369714.asia-southeast1.run.app/drivers");
    sleep(0.1);
}