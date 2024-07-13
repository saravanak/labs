import { cn } from '@/lib/utils';
import ListItem from './list-item';
import { Case } from 'change-case-all';
import { clamp } from '@/utils/string';

export default function PropertyListItem({
  property,
  propertyRenderer,
  value,
  valueRenderer,
  asTag,
  tagColor,
  valueClassNames,
  ...props
}: any) {
  return (
    <ListItem {...props} drawBorder={true}>
      {propertyRenderer ? (
        propertyRenderer()
      ) : (
        <div className='font-bold mr-8'>{Case.title(property)}</div>
      )}
      <div
        className={cn(
          'align-right px-4 py-2 rounded-md mx-2 ',
          asTag ? `${tagColor}` : '', valueClassNames
        )}
      >
        {valueRenderer ? (
          valueRenderer()
        ) : (
          <span title={value}>{clamp(value, 8)}</span>
        )}
      </div>
    </ListItem>
  );
}
