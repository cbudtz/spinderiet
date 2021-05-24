import {apiGetStaticProps} from "./api/api";
import BasePage from "./components/BasePage";


export default function Priserpatient(props) {
    console.log(JSON.stringify(props))
    const title = "Lægerne i spinderiet - Lægerne"
  return <BasePage title={title} content={props.content}/>
}

export async function getStaticProps({test =""}){
  return apiGetStaticProps("priserpatient")
}