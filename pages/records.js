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

const recordsData = `Treecreeper,WS,22/04/2011,,1,"Carrying food, WSL/BSL.",FF,P Gipson
Whitethroat,DP,23/04/2011,,10,,,B Reeve
Common Tern,WS,23/04/2011,,4,,,B Reeve
Common Tern,BS,23/04/2011,,3,Chasing each other high over Black Swan,,I D Paine
Nightingale,DP,23/04/2011,,2,pointed out to me  by  another birder who was present and who had found them before i arrived. In the scrub between   the Point and  Middle Marsh m and f,,I D Paine
Cuckoo,LL,23/04/2011,,1,"Seen in trees out to right of hide, behind scrape.",,R Marsh
Garden Warbler,DP,23/04/2011,,1,singing,,V Forster
Bullfinch,DP,23/04/2011,,1,,,B Reeve
Cuckoo,DP,23/04/2011,,,only heard,,B Reeve
Egyptian Goose,LL,25/04/2011,,4,,,M F Walford
Blackcap,DP,27/04/2011,,30,Difficult to get an exact number as almost none of these were actually seen!!,,A Berryman
Common Tern,DP,27/04/2011,,9,,,K I Tubb
Teal,DP,27/04/2011,,6,3m 3f,,K I Tubb
Egyptian Goose,DP,27/04/2011,,4,,,K I Tubb
Nightingale,DP,27/04/2011,,4,"2-3 birds singing in Middle Marsh, 2 birds in scrub between WSL and BSL. One bird showed fairly well for a couple of mins. I will post some pics later.",,A Berryman
Sedge Warbler,DP,27/04/2011,,3,,,K I Tubb
Little Ringed Plover,DP,27/04/2011,,2,On island in Sandford Lake,,B N Pavey
Redshank,DP,27/04/2011,,2,,,K I Tubb
Sedge Warbler,LL,27/04/2011,,2,1 Seen from bittern hide and another singing near garden warbler.,,A Berryman
Garden Warbler,DP,27/04/2011,,2,,,K I Tubb
Wigeon,DP,27/04/2011,,1,f,,K I Tubb
Red Kite,DP,27/04/2011,,1,Low over Lavell's Lake,,K I Tubb
Buzzard,DP,27/04/2011,,1,Over Sandford Lake,,K I Tubb
Cuckoo,DP,27/04/2011,,1,,,K I Tubb
Grey Wagtail,DP,27/04/2011,,1,f,,K I Tubb
Cetti's Warbler,DP,27/04/2011,,1,,,K I Tubb
Garden Warbler,LL,27/04/2011,,1,In usual place between the two benches near bittern hide.,,A Berryman
Garden Warbler,LL,28/04/2011,,5,"3 along Loddon fp, and 2 more on S side of lake, just E of Teal hide. m",,P Bright-Thomas
Cuckoo,LL,28/04/2011,,1,"Singing from island, visible from Bittern Hide side m",S,P Bright-Thomas
Little Ringed Plover,SA,29/04/2011,,2,On shingle island.,,R Marsh
Kestrel,LL,29/04/2011,,1,"Also: Garden Warbler, 2 x G. Heron, L. Egret, pair Shoveler.",,R Marsh
Nightingale,DP,30/04/2011,,4,,,L R Blundell
Sedge Warbler,DP,30/04/2011,,4,,,L R Blundell
Whitethroat,DP,30/04/2011,,4,,,L R Blundell
Cetti's Warbler,DP,30/04/2011,,2,One WSL near reed bed. 1 BSL near the spit.,,L R Blundell
Garden Warbler,DP,30/04/2011,,2,Numerous blackcaps.,,L R Blundell
Little Egret,LL,30/04/2011,,1,"Presumed first-summer, lacking aigrettes or any bright bare parts colouring, but with some shaggy plumes on breast and tertials. Also had swollen and/or encrusted knee joints, being proportionally much thicker than those of adjacent Grey Heron. 1s",,P Bright-Thomas
Reed Warbler,DP,30/04/2011,,1,,,L R Blundell
Reed Bunting,DP,30/04/2011,,1,,,L R Blundell
Common Tern,SA,02/05/2011,,8,,,R C Watts
Gadwall,LL,02/05/2011,,7,"1 male displaying to/with 2 of the females - head bobbing, etc. 4 m. 3 fem.",,R Marsh
Lesser Black-backed Gull,SA,02/05/2011,,3,,,R C Watts
Chiffchaff,LL,02/05/2011,,3,,,R C Watts
Little Grebe,LL,02/05/2011,,1,From Teal hide. 1st I've seen here for about 2 weeks.  Also Grey Heron on the scrape and fem. Mallard still with 11 young.,,R Marsh
Sparrowhawk,DP,02/05/2011,,1,Flew across f/p which runs from WSL to Sandford.  Headed towards Loddon.,,R Marsh
Common Sandpiper,LL,02/05/2011,,1,"Seen here by observers at same time as 2 seen at LFGP, so at least 3 on the patch.  This 1 was in immaculate plumage.  Cuckoo heard from here as well as LFGP and BSL but none seen today.",,R Marsh
Kingfisher,SA,02/05/2011,,1,Flashed past in front of hide.  Whitethroat singing fom tree top at mill end of lake.,,R Marsh
Garden Warbler,LL,02/05/2011,,1,,,R C Watts
Cuckoo,DP,05/05/2011,,1,,,A Booth
Mallard,LL,06/05/2011,,10,10juvs,,M F Walford
Chiffchaff,LL,06/05/2011,,3,Adult feeding 2 juvs in a bush near car park footbridge.,,R Marsh
Blue Tit,LL,06/05/2011,,3,"Initially 2 adults in and out of nest box with food, later a fledgling was seen in nearby tree demanding to be fed.",,R Marsh
Little Ringed Plover,SA,06/05/2011,,2,On the shingle fringed island again.,,R Marsh
Grey Heron,SA,06/05/2011,,1,Came down and took a mallard chick despite frantic defensive tactics of male mallard.,,L Garner-Langham
Great Spotted Woodpecker,LL,06/05/2011,,1,Across the Loddon from Teal hide. Male later seen at Black Swan lake. fem.,,R Marsh
Reed Warbler,LL,06/05/2011,,1,"Seen from Bittern hide, at least 4 male Sedge Warblers in the vicinity.",,R Marsh
Garden Warbler,LL,06/05/2011,,1,Near Jerrys bench.  Blackcap and Chiffchaffs nearby.,,R Marsh
Common Sandpiper,BS,08/05/2011,,2,At BSL sailing club for EEG walk,,R Reedman
Little Egret,SA,08/05/2011,,1,,,R C Watts
Little Ringed Plover,DP,08/05/2011,,1,With Common Sandpipers,,R Reedman
Mallard,LL,09/05/2011,,11,Still 10 juvs of the original 11 which seems good going after over a week. fem.,,R Marsh
Common Tern,LL,09/05/2011,,3,2 of them seen on new raft in front of Bittern hide for at least 10 mins.,,R Marsh
Little Egret,LL,09/05/2011,,1,From Bittern hide.,,R Marsh
Little Ringed Plover,SA,09/05/2011,,1,Only 1 seen today on usual island.  2nd sat on nest?,,R Marsh
Common Tern,SA,11/05/2011,,2,"Also seen: LBB Gulls - 2 adult + 2 imm.   Herring Gull, BH Gulls (2 pairs on nests).",,R Marsh
Bullfinch,DP,11/05/2011,,1,Flew across the road up to aviation museum and disappeared into undergrowth. m.,,R Marsh
Little Ringed Plover,SA,12/05/2011,,1,Still only 1 bird showing.  Also on the lake: G.C. Grebe sat on nest.,,R Marsh
Green Woodpecker,LL,12/05/2011,,1,"Flushed from area between benches, nr Bittern hide. m.",,R Marsh
Cetti's Warbler,DP,12/05/2011,,1,"In bushes on bank of Loddon, 150 m from footbridge.  Seen occasionally over 15 mins, heard regularly. 2nd similar looking bird flew in at one stage (poor view) and evoked immediate singing - poss. female? m.",,R Marsh
Willow Warbler,WS,12/05/2011,,1,"1st here this year for me.  Also in reedbed: Reed Bunting, Sedge Warbler, Reed Warbler, all males. m.",,R Marsh
Swift,SA,13/05/2011,,10,over the lake,,D Lloyd
Great Spotted Woodpecker,DP,16/05/2011,,2,"Pair at nest, fem. emerged from hole. Dead tree next to Loddon.",,R Marsh
Reed Warbler,LL,16/05/2011,,2,Pair in reedbed by f/p to Bittern hide.,,R Marsh
Song Thrush,DP,16/05/2011,,1,"With a beak full of worms, on meadow near children's play area.",,R Marsh
Gadwall,SA,17/05/2011,,9,,,R Marsh
Great Spotted Woodpecker,DP,17/05/2011,,2,"At nest hole, with a poss. 3rd heard nearby. With Gray B.  We also saw a fem. carrying food into a tree around Black Swan Lake. m. & fem.",,R Marsh
Little Egret,LL,17/05/2011,,1,"Seen from Bittern hide, with a Grey Heron close by.",,R Marsh
Sparrowhawk,DP,17/05/2011,,1,"Amazing what you can find when looking for a GSW nest hole.  Could live close by as there is a suitable looking nest 3 trees along, also on bank of Loddon. fem.",,R Marsh
Little Ringed Plover,SA,17/05/2011,,1,On the usual island.  1 was also seen by other observers at Lea Fm GP this a.m.,,R Marsh
Treecreeper,DP,17/05/2011,,1,Between White Swan Lake and the R. Loddon.,,R Marsh
Common Sandpiper,LL,18/05/2011,,2,Seen from Bittern hide with Ian Paine.,,R Marsh
Redshank,LL,18/05/2011,,2,"Flitted from Teal hide to Bittern hide, then back. Good view on scrape in front of Teal hide, where they settled.",,R Marsh
Kestrel,DP,18/05/2011,,1,Flew over R. Loddon footbridge > showcase cinema. fem.,,R Marsh
Pied Wagtail,LL,18/05/2011,,1,"On the bund.  Also around the lake: Reed Buntings, Reed Warbler, Sedge Warbler, Wren.",,R Marsh
Willow Warbler,WS,18/05/2011,,1,"On the f/path, appeared to be collecting nesting material.",,R Marsh
Little Ringed Plover,SA,19/05/2011,,1,On the usual island.,,R Marsh
Great Spotted Woodpecker,DP,19/05/2011,,1,Taking a beak full of food into a nest hole. m.,,R Marsh
Bullfinch,WS,19/05/2011,,1,Near fisherman's car park. m.,,R Marsh
Mallard,LL,20/05/2011,,8,2 broods of 4,,M F Walford
Coot,SA,20/05/2011,,7,"broods of 3,2,1 & 1",,M F Walford
Mallard,WS,20/05/2011,,6,6juv,,M F Walford
Great Crested Grebe,SA,20/05/2011,,2,"On nest on small island 1m, 1f",,L Garner-Langham
Reed Warbler,LL,20/05/2011,,2,From Teal hide.,,R Marsh
Little Ringed Plover,SA,20/05/2011,,1,,,M F Walford
Redshank,LL,20/05/2011,,1,,,M F Walford
Kingfisher,LL,20/05/2011,,1,Teal hide. 2nd seen later from Bittern hide.,,R Marsh
Green Woodpecker,LL,20/05/2011,,1,Teal hide.,,R Marsh
Grey Wagtail,LL,20/05/2011,,1,,,M F Walford
Great Spotted Woodpecker,DP,21/05/2011,,2,Feeding at nest hole beside Loddon. fem. + juv.,,R Marsh
Whitethroat,DP,21/05/2011,,2,male feeding a juvenile,,S P Adam
House Sparrow,DP,21/05/2011,,2,1 male & 1 female,,S P Adam
Egyptian Goose,DP,21/05/2011,,1,seen from look-out,,S P Adam
Little Grebe,LL,21/05/2011,,1,"From Bittern hide, foraging beside the bund.",,R Marsh
Red Kite,DP,21/05/2011,,1,,,S P Adam
Redshank,LL,21/05/2011,,1,On the scrape in front of Teal hide.,,R Marsh
Cuckoo,LL,21/05/2011,,1,"Seen from Teal hide flying over lake > Bittern hide.  Later saw 1 fly back > Lea Fm, approx. 11:45, also seen from Teal hide.",,R Marsh
Kingfisher,LL,21/05/2011,,1,Seen from Teal hide - 1st picked up by Tim James as it flew down lake > Bittern hide.,,R Marsh
Nightingale,WS,21/05/2011,,1,"singing, seen briefly",,L Forster
Song Thrush,DP,21/05/2011,,1,,,P Adam
Reed Warbler,LL,21/05/2011,,1,"In front of Bittern hide, collecting cobwebs from a dead branch. With Paul Foulds, who may have a pic to share?",,R Marsh
Chiffchaff,DP,21/05/2011,,1,singing,,S P Adam
Jay,WS,21/05/2011,,1,,,S P Adam
Reed Bunting,DP,21/05/2011,,1,male singing,,S P Adam
Great Spotted Woodpecker,DP,22/05/2011,,2,Feeding at nest hole beside Loddon. m. + juv.,,R Marsh
Little Grebe,LL,22/05/2011,,1,,,S P Adam`

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
