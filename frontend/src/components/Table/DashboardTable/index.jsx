import styles from "./index.module.scss";

export default function DashboardTable({ trafficPoints, onSectionSelect }) {
  return (
    <div className={styles["summary-table"]}>
      <table>
        <thead>
          <tr onClick={() => onSectionSelect?.(null)}>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles["total-row"]}>
            <th>방문자 라벨</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {trafficPoints.map((traffic, i) => (
            <tr
              key={i}
              className={styles["section-row"]}
              onClick={() => onSectionSelect?.(traffic.userLabel)}
            >
              <td>{traffic.userLabel}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
