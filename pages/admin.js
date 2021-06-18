import BasePage from "../components/BasePage";


export default function Admin() {
    const title = "Lægerne i spinderiet - Admin"
    return (<><head>
        <title>HTML Redirect</title>
        <meta http-equiv="refresh"
              content="0; url = https://spinderietapi.4a4b.dk/admin" />
    </head>

        <body>
        <h1>
            Login - viderestiller
        </h1>

        <p>
            Hvis viderestilling ikke virker:
            <a href={'https://spinderietapi.4a4b.dk/admin'}>Login</a>
        </p>
        </body>
    </>)
}