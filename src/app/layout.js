import ThemeRegistry from "@/components/ThemeRegistry";
import { Box } from "@mui/material";
import "./globals.css";

export const metadata = {
  title: "K-Bill",
  description: "Cable management application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeRegistry>
          <Box sx={{ 
            maxWidth: '480px', 
            margin: '0 auto', 
            minHeight: '100vh', 
            backgroundColor: '#000',
            position: 'relative',
            boxShadow: { sm: '0 0 20px rgba(255,255,255,0.05)' }
          }}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
