import React from 'react';

const TextColumn = (props) => (
  <div className={`textColumn ${props.align || ''}`}>
    {props.children}
  </div>
);

const TextColumnMiddle = (props) => (
  <TextColumn {...{...props, align: 'middle'}} />
);

const TextColumnBottom = (props) => (
  <TextColumn {...{...props, align: 'bottom'}} />
);

const Spacer = () => (
  <div style={{flexGrow: 0, flexShrink: 0, flexBasis: '15vw'}}/>
);

const Stories = {
  "i wanna tell you that you're cool": (photos) => (
    <React.Fragment>
      <TextColumn>i guess</TextColumn>
      {photos['./71020004.jpeg']}
      <TextColumnMiddle>
{
`i've been waiting for something.
least that's how it feels.`
}
      </TextColumnMiddle>
      <TextColumnBottom>
{
`hard to say what.`
}
      </TextColumnBottom>
      <Spacer/>
      {photos['./79068TAngu082808-R4-120.jpg']}
      <TextColumn>
      </TextColumn>
      <TextColumnBottom>
{
`i wanna tell you that you're cool,
that i want to get to know you,
that we should get coffee,
or hang out,
or take photos,
or just kick it, if that's cool,
`
}
      </TextColumnBottom>
      <TextColumn>
      </TextColumn>
      {photos['./85740MSlee103002-R1-003.jpg']}
      <TextColumn>
{
`because i like the way words form around you
as if they belonged.

i'm not sure why i feel i need excuses or reasons
to say any of these things.`
}
      </TextColumn>
      {photos['./85740MSlee103002-R1-005.jpg']}
      {photos['./85740MSlee103002-R1-019.jpg']}
      {photos['./85740MSlee103002-R1-018.jpg']}
      <Spacer/>
      {photos['./79068TAngu082808-R4-132.jpg']}
      <Spacer/>
      {photos['./85740MSlee103002-R1-023.jpg']}
      {photos['./85740MSlee103002-R1-022.jpg']}
      <TextColumn>
{
`we blinked, and the summers gone.

i'd been saving all this light to share with you,
golden hours, falling suns
rising moons and bleached skies
only to find i'd wasted it all,
waiting.
`
}
      </TextColumn>
      {photos['./85740MSlee103002-R1-013.jpg']}
      {photos['./85740MSlee103002-R1-012.jpg']}
      {photos['./81825ESlee092507-R3-097.jpg']}
      <TextColumn>
{
`for a while, i wanted to tell stories i knew i couldn't,
with words not my own. i wanted to see things in my photographs
i knew weren't there.
`
}
      </TextColumn>
      <TextColumnMiddle>
{
`that didn't last long.
`
}
      </TextColumnMiddle>
      <Spacer/>
      <Spacer/>
      <Spacer/>
      {photos['./85740MSlee103002-R1-024.jpg']}
      {photos['./85740MSlee103002-R1-035.jpg']}
      <TextColumnMiddle>
{
`i don't know what to say.

i don't know what i want to say.
i don't know what i want, or where i'm headed
or why,
and i think that's ok.
`
}
      </TextColumnMiddle>
      <TextColumnBottom>
{
`those years will come someday.
`}
      </TextColumnBottom>
      <Spacer/>
    </React.Fragment>
  ),
};

export default Stories;
