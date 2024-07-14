import { cn } from '@/lib/utils';
import { Case } from 'change-case-all';
import ListItem from './list-item';

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
          'align-right p-2 rounded-md max-w-[50%]',
          asTag ? `${tagColor} opacity-80` : '',
          valueClassNames
        )}
      >
        {valueRenderer ? (
          valueRenderer()
        ) : (
          <div title={value} className='text-ellipsis overflow-hidden '>
            {value}
          </div>
        )}
      </div>
    </ListItem>
  );
}
