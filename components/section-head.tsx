export function SectionHead({tag,title,lead,center=false}:{tag?:string;title:string;lead?:string;center?:boolean}) {
  return <div className={`section-head ${center?'center':''}`}>
    {tag&&<p className="section-tag">{tag}</p>}
    <h2>{title}</h2>
    {lead&&<p className="section-lead">{lead}</p>}
  </div>;
}
