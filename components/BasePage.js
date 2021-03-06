import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React from "react";
import Head from "next/head";
import PageContent from "./PageContent";
import TopBar from "./TopBar";
import {useRouter} from "next/router";

export default function BasePage({title,content}){
    let router = useRouter()
    console.log("Path: " + router.route)
    console.log("Rendering: " + title);
    console.log("Contents: " + JSON.stringify(content))
    return <div>
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main>
            <TopBar/>

                <PageContent contents={content}/>
        </main>


        <footer>

        </footer>
    </div>
}