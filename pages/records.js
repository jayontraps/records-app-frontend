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
Water Rail,WS,23/11/2011,,1,Heard,,F J Cottington
Green Sandpiper,DP,27/06/2018,,1,,,B J Walker
Green Sandpiper,DP,18/09/2018,,1,Bittern hide. Flushed by work party,,D W Hampton
Green Sandpiper,LF,08/03/2018,,1,Still present on the balancing pool.. Time: 12:00,,R Marsh
Green Sandpiper,LF,13/03/2018,,1,Balancing pool (bottom right of Lavell's car park field).,,R Marsh
Green Sandpiper,LF,24/04/2018,,1,,,R Dawson
Green Sandpiper,LF,12/06/2018,,1,SW corner. Time: 12:00,,F J Cottington
Green Sandpiper,LF,21/08/2018,,1,,,R Marsh
Green Sandpiper,LF,04/09/2018,,1,SW corner.,,R Marsh
Green Sandpiper,LF,06/09/2018,,1,SW corner.,,R Marsh
Green Sandpiper,LF,09/09/2018,,1,,,R Dawson
Green Sandpiper,LF,04/10/2018,,1,,,R Marsh
Green Sandpiper,LF,13/10/2018,,1,,,Wildfowl counts
Green Sandpiper,LF,10/11/2018,,1,,,R Righelato
Green Sandpiper,LF,17/11/2018,,1,At the balancing pool in southeast corner.,,R Marsh
Green Sandpiper,LF,05/12/2018,,1,,,J Lerpiniere
Green Sandpiper,LL,06/01/2018,,1,Flew over at dusk calling.,,A B Tomczynski
Green Sandpiper,LL,27/01/2018,,1,On balancing pool.. Time: 09:15,,B T Bennett
Green Sandpiper,LL,01/03/2018,,1,Off East over car park. Time: 14:00,,F J Cottington
Green Sandpiper,LL,19/03/2018,,1,On the balancing pool at the back of the car park field.. Time: 15:00,,R Dawson
Green Sandpiper,LL,01/07/2018,,1,Tern scrape. Time: 07:15,,F J Cottington
Green Sandpiper,LL,12/07/2018,,1,Flew from the Bittern hide scrape to the island.,,R Marsh
Green Sandpiper,LL,19/07/2018,,1,,,K Seymour
Green Sandpiper,LL,02/08/2018,,1,,,R Marsh
Green Sandpiper,LL,13/08/2018,,1,,,R Marsh
Green Sandpiper,LL,14/09/2018,,1,From Bittern hide. Time: 10:30,,R R Keel
Green Sandpiper,LL,01/10/2018,,1,,,R Marsh
Green Sandpiper,LL,28/10/2018,,1,Dropped into Tern scrape 11:40 during work party. Time: 11:30,,F J Cottington
Green Sandpiper,SF,27/07/2018,,1,"Near hide, on exposed mud by hide. Often 2 there first thing.. Time: 06:30",,F J Cottington
Green Sandpiper,SF,10/08/2018,,1,,,R Marsh
Redshank,LF,13/03/2018,,1,"Dropped in on east shore, behind island, per Geoff Emmett.. Time: 13:05",,R Marsh
Redshank,LF,16/03/2018,,1,"Landed on east shore, behind island, per Geoff Emmett.. Time: 13:05",,R Marsh
Greenshank,LF,05/05/2018,,1,Feeding in SW corner.. Time: 06:00,,B T Bennett
Black-headed Gull,LF,08/04/2018,,1,Ringed '28N0' - Ringed on Lea Farm 06/14,,D Blackmore
Mediterranean Gull,LF,02/03/2018,,1,Almost complete hood. Orange ring rt leg - to distant to read; metal ring left leg.. ad. Time: 09:30,,A B Tomczynski
Mediterranean Gull,LL,24/02/2018,,1,Ad with partial hood on water to right of island before flying off towards Lea Farm with the rest of the gull flock. Time: 12:30,,D Mackenzie
Mediterranean Gull,LL,25/02/2018,,1,"Presumably same bird as seen by others yesterday, with partial hood. Flushed from bund, then from Tern island and not seen again. Later re-located by BTB on Black Swan Lake.. Time: 08:25",,R Marsh
Common Gull,DP,19/01/2018,,1,,,Wildfowl counts
Common Gull,LF,18/02/2018,,1,,,Wildfowl counts
Common Gull,LF,08/09/2018,,1,,,Wildfowl counts
Common Gull,LL,16/01/2018,,1,,,R Marsh
Common Gull,LL,26/12/2018,,1,,,K Seymour
Common Gull,WS,17/10/2018,,1,,,R Marsh
Herring Gull,DP,05/05/2018,,1,,,B J Walker
Herring Gull,DP,11/06/2018,,1,,,R C Moore
Herring Gull,DP,27/06/2018,,1,,,B J Walker
Herring Gull,LF,04/01/2018,,1,imm.. Time: 08:30,,R Marsh
Herring Gull,LF,08/09/2018,,1,,,Wildfowl counts
Herring Gull,LF,10/11/2018,,1,,,Wildfowl counts
Herring Gull,LL,01/01/2018,,1,,,K Seymour
Herring Gull,LL,02/05/2018,,1,,,K Seymour
Herring Gull,LL,06/06/2018,,1,,,K Seymour
Herring Gull,LL,02/11/2018,,1,ad w/p,,R Marsh
Lesser Black-backed Gull,DP,18/02/2018,,1,,,Wildfowl counts
Lesser Black-backed Gull,DP,05/05/2018,,1,,,B J Walker
Lesser Black-backed Gull,LF,18/02/2018,,1,,,Wildfowl counts
Lesser Black-backed Gull,LF,12/07/2018,,1,,,R Marsh
Lesser Black-backed Gull,LF,17/12/2018,,1,Time: 11:40,,R Marsh
Lesser Black-backed Gull,LL,02/05/2018,,1,,,K Seymour
Lesser Black-backed Gull,LL,22/11/2018,,1,,,R Marsh
Common Tern,DP,27/06/2018,,1,,,B J Walker
Common Tern,LL,16/05/2018,,1,,,K Seymour
Rock Dove,LL,19/07/2018,,1,,,K Seymour
Stock Dove,DP,05/05/2018,,1,,,B J Walker
Stock Dove,DP,11/06/2018,,1,,,R C Moore
Stock Dove,DP,27/06/2018,,1,,,B J Walker
Stock Dove,DP,31/12/2018,,1,,,L Mann
Stock Dove,LL,09/05/2018,,1,,,K Seymour
Woodpigeon,DP,20/01/2018,,1,,,J P Martin
Woodpigeon,LL,01/01/2018,,1,,,K Seymour
Woodpigeon,LL,02/05/2018,,1,,,K Seymour
Collared Dove,LL,04/03/2018,,1,,,K Seymour
Collared Dove,LL,02/05/2018,,1,,,K Seymour
Cuckoo,DP,26/04/2018,,1,,,L Mann
Cuckoo,LL,20/04/2018,,1,1 calling near Teal hide about 6pm,S,M H Turton
Cuckoo,LL,26/04/2018,,1,,,K Seymour
Barn Owl,DP,24/07/2018,,1,,,D Williams-Jones
Barn Owl,DP,04/08/2018,,1,,,L Mann
Barn Owl,LL,31/01/2018,,1,Time: 17:30,,J C Morgan
Barn Owl,LL,22/06/2018,,1,Time: 20:45,,J C Morgan
Barn Owl,LL,02/08/2018,,1,Adult seen briefly in doorway to box.,,R Marsh
Barn Owl,LL,24/09/2018,,1,sitting in door of box. Time: 18:40,,J C Morgan
Barn Owl,LL,29/09/2018,,1,,,R Marsh
Barn Owl,LL,22/10/2018,,1,In full view in doorway to box at 08.25.,,R Marsh
Barn Owl,LL,29/10/2018,,1,Looking out of box. Time: 06:50,,R C Watts
Barn Owl,LL,02/11/2018,,1,In doorway to box.,,R Marsh
Barn Owl,LL,17/11/2018,,1,In the doorway to the box.,,R Marsh
Barn Owl,SF,21/03/2018,,1,Trying to spot a Tawny owl when this owl flew along the ditch and dived and landed about 10 foot away from me. After watching each other for over a minute it flew to the otherside of the ditch. Time: 19:30,,J C Morgan
Tawny Owl,LL,06/11/2018,,1,flying low over Teal scrape. Time: 06:30,,T O Alexander
Tawny Owl,SF,11/01/2018,,1,Calling & showing in trees on west side.. m. Time: 16:50,,B T Bennett
Swift,LL,21/04/2018,,1,,,J Taylor
Kingfisher,DP,17/02/2018,,1,,,M Fitzgerald
Kingfisher,DP,18/02/2018,,1,,,Wildfowl counts
Kingfisher,DP,05/09/2018,,1,,,B J Walker
Kingfisher,DP,02/11/2018,,1,Middle Marsh,,R Marsh
Kingfisher,DP,10/11/2018,,1,,,Wildfowl counts
Kingfisher,DP,08/12/2018,,1,,,Wildfowl counts
Kingfisher,LF,24/04/2018,,1,probably 2. Very active and vociferous between the green bridge and the hide,,R Dawson
Kingfisher,LF,30/06/2018,,1,"On a post along the Loddon, opposite the green bridge.. 1",,R Marsh
Kingfisher,LF,12/07/2018,,1,"Perched on a post along the Loddon, opposite the green bridge. Saw one on the same post last week.",,R Marsh
Kingfisher,LF,24/08/2018,,1,Flew past hide.,,R Marsh
Kingfisher,LF,31/08/2018,,1,,,A B Tomczynski
Kingfisher,LF,04/09/2018,,1,,,R Marsh
Kingfisher,LF,04/10/2018,,1,Seen briefly.,,R Marsh
Kingfisher,LF,16/12/2018,,1,Time: 09:20,,R Marsh
Kingfisher,LF,27/12/2018,,1,On Loddon behind hide. fem.. Time: 10:30,,F Hutchinson
Kingfisher,LL,16/03/2018,,1,Lavells car park. Kingfisher left Embrook by footbridge and flew over the car park field copse. and high over trees at far end of field on the East side. Not heading for settling pond though!. Time: 11:00,,A Rymer
Kingfisher,LL,01/07/2018,,1,Flew from perch as I sat down. Time: 10:00,,A Rymer
Kingfisher,LL,06/07/2018,,1,On perch to right of Bittern Hide.. fem. Time: 19:30,,A Rymer
Kingfisher,LL,06/08/2018,,1,From Bittern hide.,,R Marsh
Kingfisher,LL,10/08/2018,,1,,,R Marsh
Kingfisher,LL,13/08/2018,,1,,,R Marsh
Kingfisher,LL,15/08/2018,,1,"Seen across the lake, then landed near Bittern hide. Photo's uploaded.. juv.",,R Marsh
Kingfisher,LL,16/08/2018,,1,Time: 16:00,,R Dawson
Kingfisher,LL,17/08/2018,,1,"Flew upstream from under bridge, from car park field to Lavells Lake. Time: 10:30",,E Napper
Kingfisher,LL,21/08/2018,,1,One also seen briefly at Lea Farm GP.. 1,,R Marsh
Kingfisher,LL,02/09/2018,,1,,,L Mann
Kingfisher,LL,04/09/2018,,1,From Bittern hide.,,R Marsh
Kingfisher,LL,06/09/2018,,1,From Bittern hide.,,R Marsh
Kingfisher,LL,13/09/2018,,1,Possibly the same bird seen later flying down the Loddon. Time: 10:45,,R Dawson
Kingfisher,LL,14/09/2018,,1,Feeding in front of Bittern hide.. Time: 10:30,,R R Keel
Kingfisher,LL,19/09/2018,,1,Time: 11:00,,R Dawson
Kingfisher,LL,20/09/2018,,1,,,K Seymour
Kingfisher,LL,21/09/2018,,1,From Bittern hide.,,R Marsh
Kingfisher,LL,29/09/2018,,1,,,R Marsh
Kingfisher,LL,01/10/2018,,1,,,K Seymour
Kingfisher,LL,03/10/2018,,1,Time: 12:05,,R Marsh
Kingfisher,LL,19/10/2018,,1,,,M Turton
Kingfisher,LL,03/12/2018,,1,Four sightings from Bittern hide at various times through the morning. One bird identified as a juv. from pics but didn't get a good enough view to sex/age the others.. Time: 08:10,,R Marsh
Kingfisher,LL,06/12/2018,,1,,,R Marsh
Kingfisher,LL,08/12/2018,,1,,,K Seymour
Kingfisher,LL,22/12/2018,,1,,,J E Warren
Kingfisher,LL,23/12/2018,,1,Flew past Bittern hide. Time: 16:00,,F Hutchinson
Kingfisher,SF,28/02/2018,,1,Flushed from ditch on west side of lake.,,R Marsh
Kingfisher,SF,18/04/2018,,1,Flew along the channel. With BTB and RM.. Time: 10:30,,R Dawson
Kingfisher,SF,30/07/2018,,1,,,D Williams-Jones
Kingfisher,SF,08/08/2018,,1,,,R Marsh
Kingfisher,SF,17/10/2018,,1,,,R Marsh
Kingfisher,SF,29/10/2018,,1,Time: 07:50,,R C Watts
Kingfisher,SF,17/11/2018,,1,,,R Marsh
Kingfisher,SF,11/12/2018,,1,,,R Marsh
Kingfisher,WS,28/02/2018,,1,Flew along the Loddon.,,R Marsh
Kingfisher,WS,21/09/2018,,1,,,R Marsh
Great Spotted Woodpecker,DP,06/01/2018,,1,,,L Mann
Great Spotted Woodpecker,DP,17/02/2018,,1,,,M Fitzgerald
Great Spotted Woodpecker,DP,17/05/2018,,1,,,L Mann
Great Spotted Woodpecker,DP,11/06/2018,,1,,,R C Moore
Great Spotted Woodpecker,DP,04/08/2018,,1,,,L Mann
Great Spotted Woodpecker,DP,05/09/2018,,1,,,B J Walker
Great Spotted Woodpecker,LL,25/02/2018,,1,,,K Seymour
Great Spotted Woodpecker,LL,19/07/2018,,1,,,K Seymour
Great Spotted Woodpecker,LL,21/08/2018,,1,,,R M Haydon
Great Spotted Woodpecker,LL,01/09/2018,,1,,,L Mann
Great Spotted Woodpecker,LL,07/09/2018,,1,,,M Turton
Great Spotted Woodpecker,LL,23/10/2018,,1,,,K Seymour
Great Spotted Woodpecker,LL,08/12/2018,,1,,,K Seymour
Great Spotted Woodpecker,LL,26/12/2018,,1,,,K Seymour
Green Woodpecker,DP,06/01/2018,,1,,,L Mann
Green Woodpecker,DP,05/05/2018,,1,,,B J Walker
Green Woodpecker,DP,17/05/2018,,1,,,L Mann
Green Woodpecker,DP,04/08/2018,,1,,,L Mann
Green Woodpecker,LF,22/12/2018,,1,,,J E Warren
Green Woodpecker,LL,10/04/2018,,1,,,K Seymour
Green Woodpecker,LL,26/04/2018,,1,,,K Seymour
Green Woodpecker,LL,02/05/2018,,1,,,K Seymour
Green Woodpecker,LL,19/07/2018,,1,,,K Seymour
Green Woodpecker,LL,06/08/2018,,1,Over car park field.,,R Marsh
Green Woodpecker,LL,19/10/2018,,1,,,M Turton
Green Woodpecker,LL,26/12/2018,,1,,,K Seymour
Kestrel,DP,20/01/2018,,1,,,J P Martin
Kestrel,LF,29/08/2018,,1,On the landfill.,,R Marsh
Kestrel,LL,03/03/2018,,1,on the power lines in the car park field. Time: 17:20,,G Turner
Kestrel,LL,20/09/2018,,1,,,K Seymour
Kestrel,LL,17/10/2018,,1,Over the car park field.,,R Marsh
Hobby,DP,08/09/2018,,1,from bittern hide. 1. Time: 15:00,,S K Proddow
Hobby,DP,18/09/2018,,1,Bittern hide,,D W Hampton
Hobby,LF,09/09/2018,,1,,,R Dawson
Hobby,LL,10/08/2018,,1,,,R Marsh
Hobby,LL,14/08/2018,,1,Time: 11:00,,R Dawson
Hobby,LL,15/08/2018,,1,Seen from Bittern hide.,,R Marsh
Hobby,LL,21/08/2018,,1,,,R Marsh
Hobby,LL,29/08/2018,,1,,,R Marsh
Hobby,LL,02/09/2018,,1,,,L Mann
Hobby,LL,13/09/2018,,1,Perched in tree on left side of lake as seen from Bittern hide. Time: 10:45,,R Dawson
Hobby,SF,19/09/2018,,1,Time: 11:15,,R Dawson
Peregrine,LF,27/01/2018,,1,fem. Time: 11:00,,B T Bennett
Peregrine,LF,12/02/2018,,1,Juvenile on landfill then flew west,,A D Bassett
Peregrine,LF,01/03/2018,,1,Time: 11:30,,B T Bennett
Peregrine,LL,01/01/2018,,1,"Chasing Lapwing, then perched in big Poplar, fab performance. Time: 16:30",,F J Cottington
Peregrine,LL,11/03/2018,,1,male,,J Taylor
Peregrine,LL,16/12/2018,,1,"Landed in poplar on north shore, then unsuccessfully swooped at Teal swimming on lake and returned to tree. Flew off after 3 or 4 minutes when harassed by 2 Magpies.. imm. with ring on left leg. Time: 08:20",,R Marsh
Peregrine,LL,31/12/2018,,1,"Perched in tree north side of lake, then flew off across landfill.. Time: 08:45",,R Marsh
Ring-necked Parakeet,DP,27/06/2018,,1,,,B J Walker
Ring-necked Parakeet,LL,04/03/2018,,1,,,K Seymour
Ring-necked Parakeet,LL,19/07/2018,,1,,,K Seymour
Ring-necked Parakeet,LL,23/10/2018,,1,,,K Seymour
Ring-necked Parakeet,LL,08/12/2018,,1,,,K Seymour
Jay,DP,27/06/2018,,1,,,B J Walker
Jay,DP,19/09/2018,,1,,,B J Walker
Jay,LL,16/05/2018,,1,,,K Seymour
Jay,LL,19/07/2018,,1,,,K Seymour
Jay,LL,20/09/2018,,1,,,K Seymour
Jay,LL,24/09/2018,,1,,,K Seymour
Jay,MM,04/01/2018,,1,,,L G R Evans
Magpie,DP,05/05/2018,,1,,,B J Walker
Magpie,DP,27/06/2018,,1,,,B J Walker
Magpie,DP,05/09/2018,,1,,,B J Walker
Magpie,LL,26/04/2018,,1,,,K Seymour
Magpie,LL,02/05/2018,,1,,,K Seymour
Magpie,LL,09/05/2018,,1,,,K Seymour
Magpie,LL,19/07/2018,,1,,,K Seymour
Magpie,LL,23/10/2018,,1,,,K Seymour
Jackdaw,LL,23/10/2018,,1,,,K Seymour
Rook,LL,04/03/2018,,1,,,K Seymour
Carrion Crow,LL,19/07/2018,,1,,,K Seymour
Carrion Crow,LL,20/09/2018,,1,,,K Seymour
Raven,LL,12/01/2018,,1,"E over the Loddon, being chased by a Kite. Time: 11:30",,R Dawson
Coal Tit,LF,12/01/2018,,1,Briefly seen on feeder.,,R Marsh
Coal Tit,LL,03/12/2018,,1,Bittern hide feeders.. Time: 09:35,,R Marsh
Marsh Tit,LL,04/03/2018,,1,,,K Seymour
Blue Tit,DP,20/01/2018,,1,,,J P Martin
Blue Tit,DP,11/06/2018,,1,,,R C Moore
Blue Tit,LL,02/05/2018,,1,,,K Seymour
Blue Tit,LL,09/05/2018,,1,,,K Seymour
Great Tit,LL,26/04/2018,,1,,,K Seymour
Great Tit,LL,09/05/2018,,1,,,K Seymour
Great Tit,LL,06/06/2018,,1,,,K Seymour
Great Tit,LL,24/09/2018,,1,,,K Seymour
Swallow,DP,21/09/2018,,1,Over the golf course. Time: 17:00,,I D Paine
Swallow,LL,04/04/2018,,1,Over landfill. Time: 09:00,,P Bright-Thomas
Swallow,LL,10/04/2018,,1,,,K Seymour
Swallow,LL,20/09/2018,,1,,,K Seymour
Cetti's Warbler,DP,05/05/2018,,1,,,B J Walker
Cetti's Warbler,LL,29/03/2018,,1,Singing near Bittern hide. m,,R Dawson
Cetti's Warbler,LL,30/03/2018,,1,,,K Seymour
Cetti's Warbler,LL,21/04/2018,,1,Near path to bittern hide. Time: 17:15,,S Lynch
Cetti's Warbler,LL,26/04/2018,,1,,,K Seymour
Cetti's Warbler,LL,04/12/2018,,1,1 calling from teal scrape. Time: 07:00,,T O Alexander
Cetti's Warbler,LL,11/12/2018,,1,teal scrape. Time: 07:30,,T O Alexander
Cetti's Warbler,LL,22/12/2018,,1,,,C Jones
Cetti's Warbler,LL,23/12/2018,,1,Sang a short phrase from the island. Heard only. Time: 16:00,,F Hutchinson
Cetti's Warbler,SF,16/01/2018,,1,"Very close to hide,Grey tail, very good match to photos online but never seen one before! Possible",,J Sandell
Cetti's Warbler,SF,04/03/2018,,1,Showing well briefly in front of hide.. Time: 10:45,,D Mackenzie
Long-tailed Tit,DP,11/06/2018,,1,,,R C Moore
Long-tailed Tit,DP,31/12/2018,,1,,,L Mann
Long-tailed Tit,LL,09/05/2018,,1,,,K Seymour
Long-tailed Tit,LL,23/10/2018,,1,,,K Seymour
Wood Warbler,DP,28/04/2018,,1,"Singing along east bank of River Loddon c.200 m south-west of The Mill (SW of road bridge over river). Present until c.14:00, when flew to other side of river. Seen by others.. male. Time: 13:10",,J Taylor
Yellow-browed Warbler,SF,24/10/2018,,1,Initially at Sandford Lake margin then flew to west side of River Lodden before returning. Good views (eventually) of it preening. Heard calling several times  helping location. Photographed.,,A B Tomczynski
Yellow-browed Warbler,SF,27/10/2018,,1,"By yellow gate, per P.S.. Time: 14:56",,F Hutchinson
Yellow-browed Warbler,SF,28/10/2018,,1,Still in same area since Wednesday. Tree's just behind yellow gate to Sandford Lake in Sandford Lane. Time: 15:00,,A Rymer
Yellow-browed Warbler,SF,29/10/2018,,1,Still present around sw corner of lake. Seen with Richard Sajdak & Ralph Watts.,,R Marsh
Yellow-browed Warbler,SF,30/10/2018,,1,Seen well in large Willow c. 30m. left of yellow entrance gate to Sandford Lake. From about 10:20 to 10:30.. Time: 10:43,,T A Guyatt
Yellow-browed Warbler,SF,31/10/2018,,1,"8th day and still present and calling on and off from same Willow at the waters edge, close to yellow gate by the lay-by. 51.449596, -0.877105. If lay-by is full the aviation museum car park is about 5 minutes walk away. 51.450621, -0.883456. Time: 06:45",,F J Cottington
Yellow-browed Warbler,SF,01/11/2018,,1,Still present in willow 20 meters left of yellow gate. (9th day!).. Time: 09:32,,B T Bennett
Yellow-browed Warbler,SF,02/11/2018,,1,"Seen on and off from 10:45 to 12:15, calling intermittently. Difficult to see in the canopy of the maple and oak trees but good views eventually obtained.. Time: 10:45",,P J Crowley
Willow Warbler,LL,30/03/2018,,1,,,K Seymour
Willow Warbler,LL,10/04/2018,,1,,,K Seymour
Willow Warbler,LL,24/04/2018,,1,Singing near stile at the back of the car park field,,R Dawson
Willow Warbler,SF,30/03/2018,,1,Along Sanford Lane neatcold lay by.Singing and showing well.. Time: 09:05,,B T Bennett
Chiffchaff,DP,27/06/2018,,1,,,B J Walker
Chiffchaff,DP,03/11/2018,,1,"Near the fisherman's car park which is north of Sandford Lane, between the 2 bridges. Large Tit flock present, but no sign of Y-B Warbler here or in the usual spot at Sandford Lake. No reported sightings from others that I'm aware of either.",,R Marsh
Chiffchaff,DP,11/12/2018,,1,"Along the Loddon, foraging in a tree above the sluice.",,R Marsh
Chiffchaff,LF,15/02/2018,,1,"Spotted by David Hampton, near the feeders.",,R Marsh
Chiffchaff,LF,26/03/2018,,1,Outside Ron's hide.. Time: 12:00,,L R Blundell
Chiffchaff,LL,08/02/2018,,1,Foraging in trees across the Loddon from Teal scrape.,,R Marsh
Chiffchaff,LL,16/03/2018,,1,Singing in car park field.,,R Marsh
Chiffchaff,LL,26/03/2018,,1,Singing in car park field. m. Time: 08:30,,P Bright-Thomas
Chiffchaff,LL,29/03/2018,,1,m,,R Dawson
Chiffchaff,LL,30/03/2018,,1,,,K Seymour
Chiffchaff,LL,01/04/2018,,1,Singing around the car park field.. Time: 08:50,,R Marsh
Chiffchaff,LL,04/04/2018,,1,Singing from car park field. m. Time: 09:00,,P Bright-Thomas
Chiffchaff,LL,10/04/2018,,1,,,K Seymour
Chiffchaff,LL,26/04/2018,,1,,,K Seymour
Chiffchaff,LL,19/07/2018,,1,,,K Seymour
Chiffchaff,LL,01/10/2018,,1,,,K Seymour
Chiffchaff,WS,26/01/2018,,1,Flitting through trees beside 'bittern reedbed'. Time: 13:45,,D Mackenzie
Sedge Warbler,DP,05/05/2018,,1,,,B J Walker
Sedge Warbler,LF,14/04/2018,,1,Singing,,J Taylor
Sedge Warbler,LL,26/04/2018,,1,,,K Seymour
Sedge Warbler,LL,02/05/2018,,1,,,K Seymour
Sedge Warbler,LL,09/05/2018,,1,,,K Seymour
Sedge Warbler,LL,13/05/2018,,1,Singing in reeds behind Bittern Hide. Time: 12:30,,F Hutchinson
Sedge Warbler,LL,19/07/2018,,1,,,K Seymour
Sedge Warbler,SF,31/08/2018,,1,,,J Vaughan
Sedge Warbler,WS,24/04/2018,,1,,,R Dawson
Reed Warbler,DP,05/05/2018,,1,,,B J Walker
Reed Warbler,DP,01/09/2018,,1,,,L Mann
Reed Warbler,LL,26/04/2018,,1,,,K Seymour
Reed Warbler,LL,19/07/2018,,1,,,K Seymour
Blackcap,DP,10/01/2018,,1,With bullfinches middle marsh. male. Time: 11:00,,I D Paine
Blackcap,DP,11/06/2018,,1,,,R C Moore
Blackcap,LF,02/11/2018,,1,Waiting it's turn to get on feeders.. m.,,R Marsh
Blackcap,LL,29/03/2018,,1,Singing opposite Jerry's bench. m,,R Dawson
Blackcap,LL,04/04/2018,,1,Singing near end of car park field. m. Time: 09:00,,P Bright-Thomas
Blackcap,LL,21/08/2018,,1,Car park field.. f.. Time: 07:45,,R Marsh
Lesser Whitethroat,LL,24/08/2018,,1,Car park field.,,R Marsh
Whitethroat,LF,06/08/2018,,1,In front of hide.,,R Marsh
Whitethroat,LL,24/04/2018,,1,In bushes on path to hide,,R Dawson
Whitethroat,LL,21/08/2018,,1,Car park field.. Time: 07:45,,R Marsh
Goldcrest,DP,17/02/2018,,1,,,M Fitzgerald
Goldcrest,LL,10/08/2018,,1,,,R Marsh
Goldcrest,SF,17/11/2018,,1,m.,,R Marsh
Wren,DP,05/05/2018,,1,,,B J Walker
Wren,LL,04/03/2018,,1,,,K Seymour
Wren,LL,10/04/2018,,1,,,K Seymour
Wren,LL,26/04/2018,,1,,,K Seymour
Wren,LL,19/07/2018,,1,,,K Seymour
Wren,LL,20/09/2018,,1,,,K Seymour
Wren,LL,01/10/2018,,1,,,K Seymour
Wren,LL,26/12/2018,,1,,,K Seymour
Nuthatch,DP,18/09/2018,,1,Bittern hide federal area,,D W Hampton
Nuthatch,LF,04/01/2018,,1,Time: 08:30,,R Marsh
Nuthatch,LF,12/01/2018,,1,,,R Marsh
Nuthatch,LF,29/03/2018,,1,,,R Marsh
Nuthatch,LF,17/07/2018,,1,,,R Marsh
Nuthatch,LF,06/08/2018,,1,On feeders.,,R Marsh
Nuthatch,LF,04/10/2018,,1,,,R Marsh
Nuthatch,LF,22/10/2018,,1,,,R Marsh
Nuthatch,LL,25/02/2018,,1,,,K Seymour
Nuthatch,LL,06/06/2018,,1,,,K Seymour
Nuthatch,LL,19/07/2018,,1,,,K Seymour
Nuthatch,LL,02/08/2018,,1,In trees by the River Loddon.,,R Marsh
Nuthatch,LL,24/08/2018,,1,Over car park field.,,R Marsh
Nuthatch,LL,07/09/2018,,1,,,M Turton
Nuthatch,LL,19/10/2018,,1,,,M Turton
Nuthatch,LL,23/10/2018,,1,,,K Seymour
Treecreeper,DP,18/09/2018,,1,Bittern hide,,D W Hampton
Treecreeper,LF,11/03/2018,,1,"Along Loddon,near gate to the hide.",,R Marsh
Treecreeper,LL,13/01/2018,,1,Around the feeders. Time: 15:30,,D Mackenzie
Treecreeper,LL,13/08/2018,,1,,,R Marsh
Treecreeper,SF,18/02/2018,,1,Another seen near Lea Farm hide.,,R Marsh
Treecreeper,SF,29/10/2018,,1,Time: 07:50,,R C Watts
Starling,DP,05/05/2018,,1,,,B J Walker
Blackbird,DP,11/06/2018,,1,,,R C Moore
Blackbird,DP,27/06/2018,,1,,,B J Walker
Blackbird,LL,01/01/2018,,1,,,K Seymour
Blackbird,LL,30/03/2018,,1,,,K Seymour
Blackbird,LL,26/04/2018,,1,,,K Seymour
Blackbird,LL,02/05/2018,,1,,,K Seymour
Blackbird,LL,19/07/2018,,1,,,K Seymour
Blackbird,LL,24/09/2018,,1,,,K Seymour
Blackbird,LL,01/10/2018,,1,,,K Seymour
Blackbird,LL,23/10/2018,,1,,,K Seymour
Blackbird,LL,08/12/2018,,1,,,K Seymour
Blackbird,LL,26/12/2018,,1,,,K Seymour
Fieldfare,LL,11/03/2018,,1,,,R Marsh
Fieldfare,LL,06/11/2018,,1,heard. Time: 07:30,,T O Alexander
Fieldfare,LL,11/12/2018,,1,Time: 07:30,,T O Alexander
Redwing,LL,26/03/2018,,1,At least one.. Time: 08:30,,P Bright-Thomas
Song Thrush,DP,05/05/2018,,1,,,B J Walker
Song Thrush,DP,11/06/2018,,1,,,R C Moore
Song Thrush,DP,27/06/2018,,1,,,B J Walker
Song Thrush,LL,04/03/2018,,1,,,K Seymour
Song Thrush,LL,10/04/2018,,1,,,K Seymour
Song Thrush,LL,26/04/2018,,1,,,K Seymour
Song Thrush,LL,02/05/2018,,1,,,K Seymour
Song Thrush,LL,16/05/2018,,1,,,K Seymour
Song Thrush,LL,26/12/2018,,1,,,K Seymour
Mistle Thrush,SF,18/02/2018,,1,Singing on north side of lake.,,R Marsh
Spotted Flycatcher,LL,28/05/2018,,1,,,K Seymour
Spotted Flycatcher,MO,13/09/2018,,1,Same area as Pied Fly.. Time: 12:30,,R Gilham
Spotted Flycatcher,SF,01/09/2018,,1,West side by stream.. Time: 07:15,,B T Bennett
Spotted Flycatcher,SF,02/09/2018,,1,Time: 11:00,,D Williams-Jones
Robin,LL,25/02/2018,,1,,,K Seymour
Robin,LL,30/03/2018,,1,,,K Seymour
Robin,LL,10/04/2018,,1,,,K Seymour
Robin,LL,26/04/2018,,1,,,K Seymour
Robin,LL,02/05/2018,,1,,,K Seymour
Robin,LL,23/10/2018,,1,,,K Seymour
Robin,LL,08/12/2018,,1,,,K Seymour
Pied Flycatcher,DP,13/09/2018,,1,"Seen twice, briefly. 2 spot fly also.. Time: 18:40",,S Ricks
Pied Flycatcher,MO,12/09/2018,,1,"Found by AM. Generally elusive, but showed well occasionally.. juv. Time: 18:30",,B T Bennett
Pied Flycatcher,MO,13/09/2018,,1,"Very elusive, but still in the stand of trees towards the northern end of the meadow.. Time: 13:00",,R Gilham
Stonechat,LF,04/10/2018,,1,Flitting about in front of the hide. Pic uploaded.,,R Marsh
Wheatear,LF,15/08/2018,,1,"On a landfill vent, having been found earlier by FJC. Seen again at 10.30 before being flushed by Summerleaze employee checking vents.. Time: 07:42",,R Marsh
Wheatear,LF,24/08/2018,,1,On & off a distant post on landfill for at least 20 minutes.,,R Marsh
Dunnock,LL,02/05/2018,,1,,,K Seymour
Yellow Wagtail,LL,13/09/2018,,1,Flew over landfill,,J Taylor
Grey Wagtail,LL,15/08/2018,,1,juv.,,R Marsh
Pied Wagtail,DP,11/06/2018,,1,,,R C Moore
Pied Wagtail,LF,13/08/2018,,1,Flew off with a beak full of insects caught around the lake's edge.,,R Marsh
Chaffinch,DP,11/06/2018,,1,,,R C Moore
Chaffinch,LL,26/04/2018,,1,,,K Seymour
Chaffinch,LL,19/07/2018,,1,,,K Seymour
Brambling,DP,07/04/2018,,1,female,,L Mann
Brambling,LL,20/01/2018,,1,In trees above Bittern hide feeder area. m. Time: 10:30,,A Rymer
Brambling,LL,09/02/2018,,1,On Bittern Hide feeders.. m. Time: 11:00,,A Rymer
Brambling,LL,01/03/2018,,1,Bittern hide feeder area.. m.,,R Marsh
Brambling,LL,07/04/2018,,1,At feeders.. Time: 10:20,,L R Blundell
Brambling,LL,08/04/2018,,1,Asleep in Bittern Hide feeding area. Time: 12:00,,F Hutchinson
Hawfinch,LL,12/01/2018,,1,In tall poplar on N side.. f. Time: 10:10,,B T Bennett
Hawfinch,LL,13/01/2018,,1,Briefly in copse in car park field. Time: 13:30,,D Mackenzie
Hawfinch,LL,14/01/2018,,1,In Car Park Field.. Time: 11:50,,J Taylor
Hawfinch,LL,28/01/2018,,1,Car park field. m. Time: 12:15,,P Bright-Thomas
Hawfinch,LL,04/02/2018,,1,In Car Park Field copse. fem. Time: 12:15,,J Taylor
Hawfinch,LL,02/03/2018,,1,Flew up to Ash on East side of car park field. m. Time: 08:21,,F J Cottington
Hawfinch,LL,29/03/2018,,1,Flew low over car park field.. f.,,R Marsh
Bullfinch,LL,03/02/2018,,1,in trees in middle of car park field. m. Time: 11:00,,P J Crowley
Bullfinch,LL,06/08/2018,,1,Over car park field.. m.,,R Marsh
Bullfinch,LL,10/08/2018,,1,m.,,R Marsh
Bullfinch,LL,21/08/2018,,1,Car park field.. m.. Time: 07:45,,R Marsh
Bullfinch,LL,26/09/2018,,1,m.. Time: 09:40,,R Marsh
Bullfinch,LL,29/09/2018,,1,f.,,R Marsh
Bullfinch,LL,02/11/2018,,1,Near Jerry's bench.. f.,,R Marsh
Bullfinch,LL,06/12/2018,,1,Car park field.. f.,,R Marsh
Bullfinch,MO,12/01/2018,,1,Near footbridge to White Swan Lake.. m.,,R Marsh
Lesser Redpoll,LF,08/02/2018,,1,"Foraging both sides of the Loddon, half way between hide & green bridge.",,R Marsh
Lesser Redpoll,LF,08/03/2018,,1,In low branches across the river opposite the hide. m. Time: 11:50,,R Dawson
Lesser Redpoll,LL,14/01/2018,,1,,,J Taylor
Goldfinch,LL,08/12/2018,,1,,,K Seymour
Siskin,LL,11/02/2018,,1,Along the Loddon at Teal hide channel,,R Dawson
Reed Bunting,DP,07/04/2018,,1,,,L Mann
Reed Bunting,LF,04/01/2018,,1,f.. Time: 08:30,,R Marsh
Reed Bunting,LF,04/10/2018,,1,m.,,R Marsh
Reed Bunting,LL,13/01/2018,,1,Around feeders. f. Time: 15:30,,D Mackenzie
Reed Bunting,LL,30/03/2018,,1,,,K Seymour
Reed Bunting,LL,10/04/2018,,1,,,K Seymour
Reed Bunting,LL,03/05/2018,,1,,,T O Alexander
Reed Bunting,LL,06/06/2018,,1,,,K Seymour
Reed Bunting,LL,19/10/2018,,1,,,M Turton
Reed Bunting,LL,06/11/2018,,1,Time: 07:30,,T O Alexander
Reed Bunting,LL,23/12/2018,,1,In reeds on the path to Bittern hide. fem. Time: 15:30,,F Hutchinson
Common Tern,LF,28/06/2018,,0,Time: 09:30,,R C Watts
Blue Tit,SF,29/10/2018,,0,Time: 07:50,,R C Watts
Sand Martin,LF,28/06/2018,,0,Time: 09:30,,R C Watts
Siskin,SF,29/10/2018,,0,Time: 07:50,,R C Watts`

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
