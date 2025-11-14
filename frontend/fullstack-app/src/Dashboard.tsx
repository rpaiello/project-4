import { useState } from "react";
import "./Dashboard.css"

interface Selected {
    current: number,
    previous: number | null
}

interface Answer {
    aid: number,
    poster: string,
    desc: string
}

interface Question {
    qid: number,
    poster: string,
    title: string,
    desc: string,
    answers : Answer[]
}

function Dashboard({content, username, logoutFunc} : any) {

    const [selected, setSelected] = useState<Selected>({current: 0, previous: null})
    
    const handleLogout = () => {
        setSelected({current: 0, previous: null});
        logoutFunc(false);
    }

    // const handleSelect = (e: any) => {
    //     const newCurrentSelected = selected;
    //     const id = e.target.key;
    //     setSelected({current: id, previous: selected.current});
    //     console.log(`Debug: ${id}\n${content[selected.current]}`);
    // }

    return (
        <>
            <header>
                <b>DarkAsk</b> logged in as <b>{username}</b> <button onClick={handleLogout}>logout?</button>
            </header>
            <div>
                <div className="sidebar">
                    {content.filter((z: Question) => z.qid != 0).map((x: Question) => 
                        <div className={`qcard${x.qid === selected.current ? " selected" : ""}`} key={x.qid} onClick={() => setSelected({current: x.qid, previous: selected.current})}>
                            <b>{x.title}</b>
                            <br />
                            <span className="subtitle">{x.poster}</span>
                        </div>
                    )}
                </div>
                <div className="maindisplay">
                    <h2>{content[selected.current].title}</h2>
                    posted by <b>{content[selected.current].poster}</b>
                    <hr />
                    <p>{content[selected.current].desc}</p>
                    <hr />
                    {content[selected.current].answers.map((ans: Answer) => <div className="acard"><b>{ans.poster}</b><p>{ans.desc}</p></div>)}
                </div>
            </div>
        </>
    )
}

export default Dashboard;