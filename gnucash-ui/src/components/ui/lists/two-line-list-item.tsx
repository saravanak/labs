export default function TwoLineListItem({firstLine, secondLineGenerator, model, ...props}:any) {
    return (
        <div {...props} className="p-2">
              <div>{firstLine}</div>
              <div className="align-right text-sm text-gray-400">
                {secondLineGenerator(model)}
                
              </div>
            </div>
    )
}