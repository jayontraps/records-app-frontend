import App from '../components/App'
import Header from '../components/Header'
import { withApollo } from '../lib/apollo'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
import { readString } from 'react-papaparse' 
import moment from 'moment'

const StyledPage = styled.div`
  margin: 30px 0;
`


function formatDateString(str) {
  let date = str.split('/').reverse().join('-')
  return moment(date).format()
}


const test = "13/01/1976"

console.log(formatDateString(test))

// LOCATIONS
const ADD_RECORD = gql`
  mutation addRecordFromCSV($data: RecordFromCSVInput!) {
    createRecordFromCSV(data: $data) {
      id
    }
  }
`

const recordsData = `Reed Bunting,WS,09/11/2011,,7,,,F J Cottington
Goldcrest,WS,09/11/2011,,5,So many Goldcrests across DP currently,,F J Cottington
Water Rail,WS,09/11/2011,,2,"At least 2 heard, plus same odd call as a few nights ago",,F J Cottington
Fieldfare,LL,09/11/2011,,2,In tall trees at Teal hide end of lake.,,R Marsh
Cetti's Warbler,LL,09/11/2011,,2,Calling near Teal Hide,,F J Cottington
Ferruginous Duck,SA,09/11/2011,,1,Still there - slightly left of hide and level with 1st island. With Steve Day.,,R Marsh
Water Rail,LL,09/11/2011,,1,spotted by steve day in front of bittern hide two brief appearances,,R A G Price
Kingfisher,SA,09/11/2011,,1,Flew past hide.  Seen fishing around main island later by Steve Day.,,R Marsh
Barn Owl,LL,10/11/2011,,1,Showing in entrance to box.,,P Bright-Thomas
Chiffchaff,LL,10/11/2011,,1,Ordinary-looking bird in top of oak by Bitter hide,,P Bright-Thomas
Ferruginous Duck,SA,12/11/2011,,1,,,B Lyle
Water Rail,LL,12/11/2011,,1,Weaving in and out of reeds in front of teal hide,,J Goodchild
Snipe,LL,12/11/2011,,1,,,J Goodchild
Barn Owl,LL,12/11/2011,,1,Sleeping in entrance of box,,J Goodchild
Little Grebe,LL,13/11/2011,,6,Teal hide.,,R Marsh
Snipe,LL,13/11/2011,,2,"From Bittern hide. Both at the r/h end of the scrape, about 5 m apart. 1st in clear view, 2nd further back and harder to see.",,R Marsh
Water Rail,LL,13/11/2011,,1,Only 1 picked up by me although Alan Rymer saw 2 before they disappeared behind the reeds to right of the Bittern hide.,,R Marsh
Kingfisher,LL,13/11/2011,,1,Near the footbridge over the Emmbrook.,,R Marsh
Bearded Tit,LL,13/11/2011,,1,Seen with Mary Jacobs from bittern hide right hand side  close in  very good views. Genuine sighting of bird.. (per  RICHARD  SAJDAK),,R C Watts
Pochard,SA,14/11/2011,,10,"5m, 5f.",,R Marsh
Little Grebe,LL,14/11/2011,,5,Total seen from Bittern + Teal hides.,,R Marsh
Common Gull,LL,14/11/2011,,2,"On the Tern raft, then chasing BH Gulls around the lake.",,R Marsh
Kingfisher,SA,14/11/2011,,2,"Low across lake, beyond islands.",,R Marsh
Buzzard,LL,14/11/2011,,1,"Sat in a tree on the main island, just above line of reedbed. Extremely dark plumage.",,R Marsh
Kingfisher,LL,14/11/2011,,1,2 passes across the lake.,,R Marsh
Great Spotted Woodpecker,LL,14/11/2011,,1,In a tree along the boundary with Lea Fm GP. fem.,,R Marsh
Treecreeper,LL,14/11/2011,,1,In the feeder area.,,R Marsh
Black-headed Gull,DP,15/11/2011,,700,,,R M Borwick
Canada Goose,DP,15/11/2011,,120,,,R M Borwick
Gadwall,DP,15/11/2011,,100,,,R M Borwick
Coot,DP,15/11/2011,,90,,,R M Borwick
Tufted Duck,DP,15/11/2011,,65,,,R M Borwick
Mute Swan,DP,15/11/2011,,55,,,R M Borwick
Siskin,SA,15/11/2011,,30,"Fock of at least 70 finches, inc Goldfinch and Chaffinch, at w end in alders",,P Bright-Thomas
Mallard,DP,15/11/2011,,25,,,R M Borwick
Lapwing,DP,15/11/2011,,25,,,R M Borwick
Wigeon,DP,15/11/2011,,22,,,R M Borwick
Woodpigeon,DP,15/11/2011,,15,,,R M Borwick
Cormorant,DP,15/11/2011,,10,,,R M Borwick
Long-tailed Tit,DP,15/11/2011,,10,,,R M Borwick
Great Crested Grebe,DP,15/11/2011,,8,,,R M Borwick
Shoveler,DP,15/11/2011,,5,,,R M Borwick
Moorhen,DP,15/11/2011,,5,,,R M Borwick
Wren,DP,15/11/2011,,5,,,R M Borwick
Blue Tit,DP,15/11/2011,,5,,,R M Borwick
Carrion Crow,DP,15/11/2011,,5,,,R M Borwick
Pochard,DP,15/11/2011,,4,,,R M Borwick
Goldeneye,DP,15/11/2011,,4,,,R M Borwick
Robin,DP,15/11/2011,,4,,,R M Borwick
Great Tit,DP,15/11/2011,,4,,,R M Borwick
Magpie,DP,15/11/2011,,4,,,R M Borwick
Chaffinch,DP,15/11/2011,,4,,,R M Borwick
Common Gull,DP,15/11/2011,,3,,,R M Borwick
Chiffchaff,DP,15/11/2011,,3,,,R M Borwick
Jackdaw,DP,15/11/2011,,3,,,R M Borwick
Starling,DP,15/11/2011,,3,,,R M Borwick
Greenfinch,DP,15/11/2011,,3,,,R M Borwick
Egyptian Goose,DP,15/11/2011,,2,,,R M Borwick
Little Grebe,DP,15/11/2011,,2,,,R M Borwick
Grey Heron,DP,15/11/2011,,2,,,R M Borwick
Goldcrest,DP,15/11/2011,,2,,,R M Borwick
Teal,DP,15/11/2011,,1,,,R M Borwick
Ferruginous Duck,DP,15/11/2011,,1,,,R M Borwick
Red Kite,DP,15/11/2011,,1,,,R M Borwick
Buzzard,LL,15/11/2011,,1,Flew low through back of Lavell's Lake,,R Reedman
Water Rail,LL,15/11/2011,,1,Heard from Teal hide.,,P Bright-Thomas
Snipe,LL,15/11/2011,,1,Edge of reeds near Water Rail,,R Reedman
Lesser Black-backed Gull,DP,15/11/2011,,1,,,R M Borwick
Herring Gull,DP,15/11/2011,,1,,,R M Borwick
Kingfisher,DP,15/11/2011,,1,,,R M Borwick
Pied Wagtail,DP,15/11/2011,,1,,,R M Borwick
Bearded Tit,LL,15/11/2011,,1,"Per Tim Alexander, ringed at back of Teal scrape, on release flew towards Tern scrape/main island reed bed. Any calls post this time up to around 11:00 were a tape, but no further sign by then male",,F J Cottington
Treecreeper,DP,15/11/2011,,1,,,R M Borwick
Jay,DP,15/11/2011,,1,,,R M Borwick
Siskin,DP,15/11/2011,,1,,,R M Borwick
Siskin,DP,16/11/2011,,20,Round sandford Lake.,,L R Blundell
Redwing,LL,16/11/2011,,3,Over - seen from Teal hide.,,R Marsh
Goldeneye,SA,16/11/2011,,1,"Tricky one to spot, eventually found by Steve Day. fem.",,R Marsh
Kingfisher,SA,16/11/2011,,1,Flashed past the hide.,,R Marsh
Great Spotted Woodpecker,LL,16/11/2011,,1,,,R Marsh
Chiffchaff,LL,16/11/2011,,1,In gardens across Loddon from Teal Hide,,P Bright-Thomas
Goldcrest,DP,16/11/2011,,1,Round Sandford Lake with tit flock.,,L R Blundell
Pochard,SA,17/11/2011,,24,Highest count so far for us this season. With Steve Day. 13 m. 11 f.,,R Marsh
Snipe,LL,17/11/2011,,3,"2 seen on scrape, near bund, then moved closer to reeds at rear. 3rd found in a gap in the reedbed, sleeping till flushed by 2 squabbling Grey Herons. With Steve Day et al.",,R Marsh
Ferruginous Duck,SA,17/11/2011,,1,Still there. Seen with Steve Day.,,R Marsh
Water Rail,LL,17/11/2011,,1,to right of bittern hide different bird from last week,,R A G Price
Fieldfare,LL,18/11/2011,,40,"Over from NW. Also 50+ at S end of Dinton, so numbers have risen recently.",,P Bright-Thomas
Water Rail,LL,18/11/2011,,2,Having along conversation from opposite ends of sluice in front of hide,,P Bright-Thomas
Snipe,LL,18/11/2011,,1,Great views at it worked it's way along the bund towards Bittern hide.,,R Marsh
Bearded Tit,LL,18/11/2011,,1,"From Teal hide, appeared at back of island reedbed, and the moved left opposite hide. m",,P Bright-Thomas
Lesser Redpoll,LL,18/11/2011,,1,Over Teal Hide,,P Bright-Thomas
Water Rail,LL,19/11/2011,,2,in dispute right of bittern hide,,R A G Price
Snipe,LL,19/11/2011,,1,,,M F Walford
Reed Bunting,LL,20/11/2011,,6,,,R Marsh
Snipe,LL,20/11/2011,,3,"On the bund side of Bittern scrape, which was just as well as we could barely see to the far side through the fog!",,R Marsh
Ferruginous Duck,SA,20/11/2011,,1,"Emerged as the mist cleared at around 12:00, to the far right as viewed from the hide. Other posts suggest it hasn't been seen since Sunday?",,B N Pavey
Water Rail,LL,20/11/2011,,1,Around the edge of Bittern hide scrape.,,R Marsh
Barn Owl,LL,20/11/2011,,1,"Seen flying into box at around this time, presumed to have left again  by 15:30 as corvids were freely going into the box.",,A Berryman
Cetti's Warbler,LL,20/11/2011,,1,Seen briefly as we left the hide - 1st willow on the l/h side of footpath. Heard frequently  around hide throughout our time there.,,R Marsh
Shoveler,SA,21/11/2011,,4,two ad drake.,,P E Hutchins
Goldeneye,SA,21/11/2011,,4,two duck / two 1w drake.,,P E Hutchins
Wigeon,SA,21/11/2011,,2,pair,,P E Hutchins
Water Rail,LL,21/11/2011,,1,Called near Teal hide,,F J Cottington
Kingfisher,SA,21/11/2011,,1,"Noted frmo this time, on-and-off towards dusk.",,P E Hutchins
Treecreeper,LL,21/11/2011,,1,in feeder area bittern hide,,R A G Price
Ferruginous Duck,SA,21/11/2011,,,No sign of this bird between this time and 16:22. 1w drk No sign of,,P E Hutchins
Song Thrush,LL,22/11/2011,,2,Both singing vigorously from outside Teal Hide m,,P Bright-Thomas
Bullfinch,LL,22/11/2011,,2,"Near Teal hide. 1m, 1f.",,R Marsh
Water Rail,LL,22/11/2011,,1,bittern hide reedbeds to right,,R A G Price
Great Spotted Woodpecker,LL,22/11/2011,,1,Bittern hide feeder area. imm. m.,,R Marsh
Cetti's Warbler,LL,22/11/2011,,1,Singing from reedbed opposite Teal Hide. m,,P Bright-Thomas
Bearded Tit,LL,22/11/2011,,1,"Showed well in reeds at back of scrape, opposite Teal Hide. m",,P Bright-Thomas
Treecreeper,LL,22/11/2011,,1,Bittern hide feeder area.,,R Marsh
Tufted Duck,SA,23/11/2011,,74,Minimum count.,,P E Hutchins
Coot,SA,23/11/2011,,73,Minimum count.,,P E Hutchins
Tufted Duck,WS,23/11/2011,,60,"Reasonable number here, flew off North 16:35",,F J Cottington
Gadwall,SA,23/11/2011,,40,Minimum count.,,P E Hutchins
Fieldfare,WS,23/11/2011,,15,Circling in to roost nearby,,F J Cottington
Pochard,SA,23/11/2011,,14,Minimum count.,,P E Hutchins
Redwing,SA,23/11/2011,,6,Moving south-west.,,P E Hutchins
Mallard,SA,23/11/2011,,5,Minimum count.,,P E Hutchins
Moorhen,SA,23/11/2011,,3,Minimum count.,,P E Hutchins
Mute Swan,SA,23/11/2011,,2,,,P E Hutchins
Shoveler,SA,23/11/2011,,2,ad drakes.,,P E Hutchins
Great Crested Grebe,SA,23/11/2011,,2,,,P E Hutchins
Kingfisher,SA,23/11/2011,,2,"Showy, mobile and vocal to shortly before dusk.",,P E Hutchins
Grey Heron,SA,23/11/2011,,1,Again moving off to the ditch at the western end of the lake late in the day. adult.,,P E Hutchins
Water Rail,WS,23/11/2011,,1,Heard,,F J Cottington`

// data: {
//   species: data[0]
//   location: data[1]
//   dateFrom: data[2]
//   dateTo: data[3]
//   count: data[4]
//   notes: data[5]
//   breedingCode: data[6]
//   observer: data[7]     
// }





const results = readString(recordsData)
console.log(results.data)

function Add() {
  let input;
  const [addRecord, { data }] = useMutation(ADD_RECORD);

  const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();                    
          const start = async () => {
            await asyncForEach(results.data, async (data) => {
              await waitFor(1000);  

              addRecord({ variables: { 
                data: {
                  species: data[0],
                  location: data[1],
                  dateFrom: formatDateString(data[2]),
                  dateTo: data[3] ? formatDateString(data[3]) : '',
                  count: data[4],
                  notes: data[5],
                  breedingCode: data[6],
                  observer: data[7]     
                }
               } 
               });   
               
               console.log('Complete: ', data)                       
            });
            console.log('Done');
          }

          start();          
        }}
      >
        
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

const IndexPage = () => (
  <App>
    <Header />
    <StyledPage>
      <Add />     
    </StyledPage>
  </App>
)

export default withApollo({ ssr: true })(IndexPage)
