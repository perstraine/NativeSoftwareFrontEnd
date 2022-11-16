import styles from "./JiraEpicSection.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import JiraEpicIssue from "./JiraEpicIssue";
import FadeLoader from "react-spinners/FadeLoader";

export default function JiraEpicSection() {
  const [loading, setLoading] = useState(true);
  const [jira, setJira] = useState([]);
    useEffect(() => {
        getJira();
    }, []);
  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    });
  }, []);
    async function getJira() {
        try {
          const response = await axios.get("https://localhost:7001/api/Jira")
          let sorted = quickSort(response.data)
          setJira(sorted);
      setLoading(!loading);
          
        }
              catch(error) {
                console.log(error);
              };
  }
  function quickSort(list) {
    if (list.length < 2) return list;
    let pivot = list[0];
    let left = [];
    let right = [];
    for (let i = 1, total = list.length; i < total; i++) {
      if (list[i].budgetRemaining < pivot.budgetRemaining) left.push(list[i]);
      else right.push(list[i]);
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
  }
  return (
    <div id={styles.jiraEpicSection}>
      <div id={styles.jiraEpicTitles}>
        <div id={styles.account}>Account</div>
        <div id={styles.name}>Name</div>
        <div id={styles.start}>Start Date</div>
        <div id={styles.due}>Due Date</div>
        <div id={styles.story}>Story Point</div>
        <div id={styles.budget}>Budget</div>
        <div id={styles.spent}>Time Spent</div>
        <div id={styles.complete}>Complete</div>
        <div id={styles.extra}></div>
      </div>
      {loading ? (
        <FadeLoader color="#81E8FF" height={17} margin={6} width={4} />
      ) : (
        jira.map((epic) => {
          return <JiraEpicIssue key={epic.id} epic={epic} />;
        })
      )}
      <div>
        <div id={styles.chevronArrowDown}></div>
      </div>
    </div>
  );
}
