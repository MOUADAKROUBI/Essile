// vite.config.js
import { defineConfig } from "file:///C:/Users/mouad%20akroubi/OneDrive%20-%20Ministere%20de%20l'education%20nationale,%20de%20l'enseignement%20sup%C3%A9rieur,%20de%20la%20formation%20professionnelle%20et%20de%20la%20recherche%20scientifique/Bureau/Essile/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/mouad%20akroubi/OneDrive%20-%20Ministere%20de%20l'education%20nationale,%20de%20l'enseignement%20sup%C3%A9rieur,%20de%20la%20formation%20professionnelle%20et%20de%20la%20recherche%20scientifique/Bureau/Essile/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dotenv from "file:///C:/Users/mouad%20akroubi/OneDrive%20-%20Ministere%20de%20l'education%20nationale,%20de%20l'enseignement%20sup%C3%A9rieur,%20de%20la%20formation%20professionnelle%20et%20de%20la%20recherche%20scientifique/Bureau/Essile/client/node_modules/dotenv/lib/main.js";
dotenv.config();
var vite_config_default = defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL),
    "process.env.VITE_ACCESS_TOKEN": JSON.stringify(process.env.VITE_ACCESS_TOKEN)
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtb3VhZCBha3JvdWJpXFxcXE9uZURyaXZlIC0gTWluaXN0ZXJlIGRlIGwnZWR1Y2F0aW9uIG5hdGlvbmFsZSwgZGUgbCdlbnNlaWduZW1lbnQgc3VwXHUwMEU5cmlldXIsIGRlIGxhIGZvcm1hdGlvbiBwcm9mZXNzaW9ubmVsbGUgZXQgZGUgbGEgcmVjaGVyY2hlIHNjaWVudGlmaXF1ZVxcXFxCdXJlYXVcXFxcRXNzaWxlXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbW91YWQgYWtyb3ViaVxcXFxPbmVEcml2ZSAtIE1pbmlzdGVyZSBkZSBsJ2VkdWNhdGlvbiBuYXRpb25hbGUsIGRlIGwnZW5zZWlnbmVtZW50IHN1cFx1MDBFOXJpZXVyLCBkZSBsYSBmb3JtYXRpb24gcHJvZmVzc2lvbm5lbGxlIGV0IGRlIGxhIHJlY2hlcmNoZSBzY2llbnRpZmlxdWVcXFxcQnVyZWF1XFxcXEVzc2lsZVxcXFxjbGllbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL21vdWFkJTIwYWtyb3ViaS9PbmVEcml2ZSUyMC0lMjBNaW5pc3RlcmUlMjBkZSUyMGwnZWR1Y2F0aW9uJTIwbmF0aW9uYWxlLCUyMGRlJTIwbCdlbnNlaWduZW1lbnQlMjBzdXAlQzMlQTlyaWV1ciwlMjBkZSUyMGxhJTIwZm9ybWF0aW9uJTIwcHJvZmVzc2lvbm5lbGxlJTIwZXQlMjBkZSUyMGxhJTIwcmVjaGVyY2hlJTIwc2NpZW50aWZpcXVlL0J1cmVhdS9Fc3NpbGUvY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52J1xuXG5kb3RlbnYuY29uZmlnKClcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgICBkZWZpbmU6IHtcbiAgICAgICdwcm9jZXNzLmVudi5WSVRFX0FQSV9VUkwnOkpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52LlZJVEVfQVBJX1VSTCksXG4gICAgICAncHJvY2Vzcy5lbnYuVklURV9BQ0NFU1NfVE9LRU4nOkpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52LlZJVEVfQUNDRVNTX1RPS0VOKVxuICAgIH1cbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4d0IsU0FBUyxvQkFBb0I7QUFDM3lCLE9BQU8sV0FBVztBQUNsQixPQUFPLFlBQVk7QUFFbkIsT0FBTyxPQUFPO0FBRWQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNOLDRCQUEyQixLQUFLLFVBQVUsUUFBUSxJQUFJLFlBQVk7QUFBQSxJQUNsRSxpQ0FBZ0MsS0FBSyxVQUFVLFFBQVEsSUFBSSxpQkFBaUI7QUFBQSxFQUM5RTtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==