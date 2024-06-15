import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Row,
  Col,
  useScreenClass,
  Visible,
} from "react-grid-system";

import { CvAnalysisResponse } from "../utils/types";

export default function DashboardGrid({
  cvAnalysisData,
}: Readonly<{ cvAnalysisData: CvAnalysisResponse | null }>) {
  // TODO: Check if this is necessary
  const screenClass = useScreenClass();

  React.useEffect(() => {
    console.log("Screen class: ", screenClass);
  }, [screenClass]);

  return (
    <Container className='w-full space-y-6'>
      {/* ANALYSIS */}
      <Visible xxl xl lg md sm xs>
        <Row>
          <Col sm={6}>
            <div className=''>
              <TextCard title='Analysis' text={cvAnalysisData?.analysis} />
            </div>
          </Col>
          <Col sm={6}>
            <div className='pt-6 sm:pt-0'>
              <ItemsCard
                title='Possible Positions'
                itemsArr={cvAnalysisData?.possiblePositions}
              />
            </div>
          </Col>
        </Row>
      </Visible>

      {/* ENHANCEMENT */}
      <Visible xxl xl lg md sm xs>
        <Row>
          <Col sm={12}>
            <div className=''>
              <TextCard
                title='Enhancement'
                text={cvAnalysisData?.enhancement}
              />
            </div>
          </Col>
        </Row>
      </Visible>

      <h3 className=' ml-2 pt-4 font-bold text-2xl font-mono'>Skills</h3>
      {/* SKILLS */}
      <Visible xxl xl lg md sm xs>
        <Row>
          {cvAnalysisData?.skills && (
            <Col>
              <div className=' flex justify-center '>
                <ItemsCard title='Skills' itemsArr={cvAnalysisData?.skills} />
              </div>
            </Col>
          )}
          {cvAnalysisData?.softSkills && (
            <Col>
              <div className=' flex justify-center '>
                <ItemsCard
                  title='Soft skills'
                  itemsArr={cvAnalysisData?.softSkills}
                />
              </div>
            </Col>
          )}
          {cvAnalysisData?.languages && (
            <Col>
              <div className=' flex justify-center pt-6 sm:pt-0'>
                <ItemsCard
                  title='Languages'
                  itemsObjArr={cvAnalysisData?.languages}
                />
              </div>
            </Col>
          )}
        </Row>
      </Visible>

      <h3 className=' ml-2 pt-4 font-bold text-2xl font-mono'>
        CV information
      </h3>
      {/* INFO */}
      <Visible xxl xl lg md sm xs>
        <Row>
          <Col>
            <div className=''>
              <ItemsCard title='Contact' itemsObj={cvAnalysisData?.contact} />
            </div>
          </Col>
          <Col>
            <div className='pt-6 lg:pt-0'>
              <TextCard title='Profile' text={cvAnalysisData?.profile} />
            </div>
          </Col>
          <Col>
            <div className='pt-6 lg:pt-0'>
              <ItemsCard
                title='References'
                itemsObjArr={cvAnalysisData?.references}
              />
            </div>
          </Col>
          <Col>
            <div className='pt-6 lg:pt-0'>
              <ItemsCard
                title='Other information'
                itemsObjArr={cvAnalysisData?.otherInformation}
              />
            </div>
          </Col>
        </Row>
      </Visible>

      <h3 className=' ml-2 pt-4 font-bold text-2xl font-mono'>Experience</h3>
      {/* EXPERIENCE */}
      <Visible xxl xl lg md sm xs>
        <Row>
          <Col>
            <div className=''>
              <ItemsCard
                title='Employment Story'
                itemsObjArr={cvAnalysisData?.employmentStory}
              />
            </div>
          </Col>
          <Col>
            <div className=''>
              <ItemsCard
                title='Projects'
                itemsObjArr={cvAnalysisData?.projects}
              />
            </div>
          </Col>
          <Col>
            <div className='pt-6 sm:pt-6 md:pt-0'>
              <ItemsCard
                title='Achievements'
                itemsObjArr={cvAnalysisData?.achievements}
              />
            </div>
          </Col>
        </Row>
      </Visible>

      <h3 className=' ml-2 pt-4 font-bold text-2xl font-mono'>Education</h3>
      {/* EDUCATION */}
      <Visible xxl xl lg md sm xs>
        <Row>
          <Col>
            <div className=''>
              <ItemsCard
                title='Education'
                itemsObjArr={cvAnalysisData?.education}
              />
            </div>
          </Col>
          <Col>
            <div className=''>
              <ItemsCard
                title='Courses'
                itemsObjArr={cvAnalysisData?.courses}
              />
            </div>
          </Col>
        </Row>
      </Visible>
    </Container>
  );
}

interface ItemsCardProps {
  title: string;
  itemsArr?: string[];
  itemsObj?: { [key: string]: string | string[] };
  itemsObjArr?: { [key: string]: string | string[] }[];
}

function ItemsCard({
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
        {itemsArr && itemsArr?.length !== 0 && (
          <div className=' flex-col col-start-3'>
            {itemsArr?.map((item) => (
              <div key={uuidv4()} className='flex gap-2'>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
        {itemsObj && (
          <div className=' flex-col col-start-3'>
            {Object.keys(itemsObj).map((key) => (
              <div key={uuidv4()} className='flex'>
                <span>
                  <span className='font-bold'>{key}: </span>
                  {itemsObj[key]}
                </span>
              </div>
            ))}
          </div>
        )}
        {itemsObjArr && itemsObjArr.length !== 0 && (
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
        )}
      </CardBody>
    </Card>
  );
}

interface TextCardProps {
  title: string | undefined;
  text: string | undefined;
}

function TextCard({ title, text }: Readonly<TextCardProps>) {
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
