import Keycloak from "keycloak-js";
export const keycloak = new Keycloak({
  realm: "dcc-dev",
  url: "http://localhost:8080/",
  clientId: "dcc-dev-auth",
});
