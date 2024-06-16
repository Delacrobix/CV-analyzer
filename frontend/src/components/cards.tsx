import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { v4 as uuidv4 } from "uuid";

interface ItemsCardProps {
  title: string;
  itemsArr?: string[];
  itemsObj?: { [key: string]: string | string[] };
  itemsObjArr?: { [key: string]: string | string[] }[];
}

export function ItemsCard({
  title,
  itemsArr,
  itemsObj,
  itemsObjArr,
}: Readonly<ItemsCardProps>) {
  return (
    <Card className='w-full h-full px-2'>
      <CardHeader className='flex'>
        <div className=' px-2'>
          <h3 className='font-mono font-bold'>{title}</h3>
        </div>
      </CardHeader>
      <hr className='ml-3 mr-6 border-dashed' />
      <CardBody>
        <div className=' flex-col col-start-3'>
          {itemsArr?.map((item) => (
            <div key={uuidv4()} className='flex gap-2'>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className=' flex-col col-start-3'>
          {Object.keys(itemsObj ?? {}).map((key) => (
            <div key={uuidv4()} className='flex'>
              <span>
                <span className='font-bold'>{key}: </span>
                {itemsObj && itemsObj[key]}
              </span>
            </div>
          ))}
        </div>
        <div className=' flex-col col-start-3'>
          {itemsObjArr?.map((item) => (
            <div key={uuidv4()} className='flex flex-col gap-2'>
              {Object.keys(item).map((key) => (
                <span key={uuidv4()}>
                  <span className='font-bold'>{key}: </span>
                  {item[key]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

interface TextCardProps {
  title: string | undefined;
  text: string | undefined;
}

export function TextCard({ title, text }: Readonly<TextCardProps>) {
  return (
    <Card className='w-full h-full px-2'>
      <CardHeader className='flex'>
        <div className=' px-2'>
          <h3 className='font-bold font-mono'>{title}</h3>
        </div>
      </CardHeader>
      <hr className='ml-3 mr-6 border-dashed' />
      <CardBody>
        <div className=' flex-col col-start-3'>
          <span>{text}</span>
        </div>
      </CardBody>
    </Card>
  );
}
