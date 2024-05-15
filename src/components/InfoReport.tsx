export interface InfoReportProps {
  title: string;
  data?: number | 0;
  className?: string;
}
function InfoReport(props: InfoReportProps) {
  // InfoReport CSS Classes

  const infoReportWrapperClass = `w-16 flex flex-col items-center ${props.className}`;
  const infoReportTitleClass = `uppercase text-2xs font-bold flex items-center max-w-full overflow-hidden `;
  const infoReportDataClass = `uppercase text-2xs font-bold flex items-center max-w-full overflow-hidden `;

  return (
    <div className={infoReportWrapperClass}>
      <p className={infoReportDataClass}>{props.data}</p>
      <p className={infoReportTitleClass}>{props.title}</p>
    </div>
  );
}
export default InfoReport;
