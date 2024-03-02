import "./globals.css";
import { Provider } from "@/app/context/Provider";

export const metadata = {
  title: "Digital Crop Quality Report",
  description: "Generate crop quality report by upload crop image.",
  manifest: "/manifest.json",
};
export const viewport = {
  themeColor: '#FFD814'
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
