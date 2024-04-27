export interface InfoReportProps {
  title: string;
  data?: number | 0;
  className?: string;
}
function InfoReport(props: InfoReportProps) {
  // InfoReport CSS Classes

  const infoReportWrapperClass = `max-width-16 flex flex-col items-center justify-center capitalize text-center ${props.className}`;
  const infoReportTitleClass = `uppercase text-xs  flex items-center justify-center w-full text-center`;
  const infoReportDataClass = `uppercase text-xs  flex items-center justify-center w-full text-center`;

  return (
    <div className={infoReportWrapperClass}>
      <p className={infoReportDataClass}>{props.data}</p>
      <p className={infoReportTitleClass}>{props.title}</p>
    </div>
  );
}
export default InfoReport;
