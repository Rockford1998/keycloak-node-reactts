import { useEffect, useState } from 'react';
import { keycloak } from './keycloak';
import axios from 'axios';


function App() {
  const [infoMessage, setInfoMessage] = useState<string | null | undefined>(null);

  const [hasInit, setHasInIt] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        await keycloak.init({
          onLoad: 'login-required'
        });
        setHasInIt(true)
      } catch (error) {
        console.error('Failed to initialize adapter:', error);
      }
    })()

  }, [])


  const getResource = async (url: string) => {

    try {

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      })

      setInfoMessage(response.data)
    } catch (error: any) {
      setInfoMessage(error.message)
    }
  }
  console.log({
    a: keycloak.hasRealmRole('ROLES_READ'),
    b: hasInit
  });

  return (
    <div>
      <div >
        <h1>Keycloak Authentication</h1>
      </div>
      <div style={{
        display: "flex",
        gap: "10px"
      }}>
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }} >
            <button style={{
              width: "300px",
              height: "40px"

            }} onClick={() => { setInfoMessage(keycloak.authenticated ? 'Authenticated: TRUE' : 'Authenticated: FALSE') }}
            >
              Is Authenticated
            </button>
            {keycloak.authenticated === false &&
              < button style={{
                width: "300px",
                height: "40px"

              }} onClick={() => { keycloak.login() }}
              >Login</button>}

            <button style={{
              width: "300px",
              height: "40px"

            }} onClick={() => { setInfoMessage(keycloak.token ? keycloak.token : null) }}
            >
              label='Show Access Token'
            </button>


            <button style={{
              width: "300px",
              height: "40px"

            }} onClick={() => { setInfoMessage(JSON.stringify(keycloak.tokenParsed)) }}
            >
              label='Show Parsed Access token'
            </button>

            <button style={{
              width: "300px",
              height: "40px"

            }} onClick={() => { setInfoMessage(keycloak.isTokenExpired(5).toString()) }}
            >
              Check Token expired
            </button>

            <button style={{
              width: "300px",
              height: "40px"

            }} onClick={() => { setInfoMessage(keycloak.token) }}
            >
              Get access token
            </button>

            <button style={{
              width: "300px",
              height: "40px"

            }} onClick={() => { getResource("http://localhost:3000/demo/health") }}
            >
              Check for health
            </button>

            <button style={{
              width: "300px",
              height: "40px"

            }} onClick={() => { getResource("http://localhost:3000/demo/admin?name=shubham") }}
            >
              i am admin
            </button>

            <button style={{
              width: "300px",
              height: "40px"
            }} onClick={() => { keycloak.updateToken(10).then((refreshed) => { setInfoMessage('Token Refreshed: ' + refreshed.toString()) }, (e) => { setInfoMessage('Refresh Error') }) }}
            >Update Token (if about to expire)</button>

            <button style={{
              width: "300px",
              height: "40px"

            }} onClick={() => { keycloak.logout({ redirectUri: 'http://localhost:5173' }) }}
            >Logout</button>

            <button style={{
              width: "300px",
              height: "40px"

            }} onClick={() => { setInfoMessage(keycloak.hasRealmRole('ROLES_READ').toString()) }}
            >has realm role "Admin</button>

            <button style={{
              width: "300px",
              height: "40px"

            }} onClick={() => { setInfoMessage(keycloak.hasResourceRole('test').toString()) }}
            >has client role "test"</button>

            {hasInit && (keycloak.hasRealmRole('ROLES_READ')) &&
              < button style={{
                width: "300px",
                height: "40px"
              }}
              >
                LIST OF ROLES
              </button>
            }
          </div>

        </div>

        <div style={{
          border: "1px solid black",
          flex: 1
        }}>
          <p style={{ wordBreak: 'break-all' }} id='infoPanel'>
            {infoMessage}
          </p>
        </div>
      </div>
    </div >
  );
}


export default App;