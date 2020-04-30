import App from '../components/App'
import Header from '../components/Header'
import { withApollo } from '../lib/apollo'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
import { readString } from 'react-papaparse' 

const StyledPage = styled.div`
  margin: 30px 0;
`


// LOCATIONS
const ADD_LOCATION = gql`
  mutation createLocation($data: LocationCreateInput!) {
    createLocation(data: $data) {
      site
    }  
  }
`

const locationData = `LL,Lavell's Lake,47841730
SA,Sandford Lake,47821728
BS,Black Swan Lake,47821723
WS,White Swan Lake,47771722
MM,Middle Mersh,47791725
MO,Mortimer's Meadow,47741721
LF,Lea Farm Lake,47841734
CP,Car park field,47861728
DP,Dinton Pastures,47811724`

// data: {
//   siteCode: data[0],
//   site: data[1],
//   gridRef: data[1]     
// }


// USERS
const ADD_USERS = gql`
  mutation createUser($data: UserCreateInput!) {
    createUser(data: $data) {
      name
    }  
  }
`

// data: {
//   name: data[0]
// }

const userData = `K Seymour
R C Watts
M Cattell
B May
M J Mitchell
L B Mann
M M Kettell
P Kendall
S A Brown
F J Cottington
R Dawson
L Seward
R A G Price
R Marsh
A B Tomczynski
L Garner-Langham
S Day
B J Hollands
Wildfowl counts
M Kettell
D J Barker
M I'Anson
G Turner
P Bright-Thomas
D Flack
P J Newbound
P Gipson
M Hunt
R Hardy
G Perrier
T A Guyatt
A P Chick
P Boult
R Righelato
P Scudamore
D J White
M D Budden
M G McCarthy
A D Bassett
A Rymer
B T Bennett
S Jones
K Creed
C Nock
R Reedman
S Hughes
D K Parker
P M Cropper
T O Alexander
R Dryden
P J Crowley
L Matthews
B A J Clark
M D Lenney
T G Ball
K E Moore
T Firth
A Slater
D Blackmore
A Cameron
R Angus
M J & L J Finch
B D Clews
I D Paine
E Napper
D Williams-Jones
N Rampton
R W Bennett
M H Turton
P O'Neil
R H Stansfield
M Vogel
J Lerpiniere
R T Stansfield
D Calcutt
L G R Evans
F Hutchinson
M Turton
R C Moore
S K Proddow
J Taylor
J P Martin
M Fitzgerald
L Mann
B J Walker
D Mackenzie
P Foulds
L R Blundell
J C Morgan
S M Meads
C R Gent
R M Haydon
N Cleere
H Brownlow
J Vaughan
S Lynch
D W Hampton
J E Warren
R R Keel
C Jones
J Sandell
R Gilham
S Ricks`








// CLASSIFICATIONS
const ADD_CLASSES = gql`
  mutation addClasses($data: ClassCreateInput!) {
  createClass(data: $data) {
    name
  }
}
`
const classData = `Bird
Insect
Mammal`







// BREEDING CODES
const ADD_BRREDINGCODE = gql`
  mutation addBreedingCode($data: BreedingCodeCreateInput!) {
    createBreedingCode(data: $data) {
      code
  }
}
`
// data: {
//   code: ,
//   group: ,
//   description:     
// }
  
const breedingData = `H,Possible,Species observed in breeding season in suitable nesting Habitat
S,Possible,Singing male present (or breeding calls heard) in breeding season in suitable breeding habitat
P,Probable,Pair observed in suitable nesting habitat in breeding season
T,Probable,Permanent Territory presumed through registration of territorial behaviour (song etc) on at least two different days a week or more apart at the same place or many individuals on one day
D,Probable,Courtship and Display (judged to be in or near potential breeding habitat; be cautious with wildfowl)
N,Probable,Visiting probable Nest site
A,Probable,"Agitated behaviour or anxiety calls from adults, suggesting probable presence of nest or young nearby"
I,Probable,"Brood patch on adult examined in the hand, suggesting Incubation"
B,Probable,Nest Building or excavating nest-hole
DD,Confirmed,Distraction-Display or injury feigning
UN,Confirmed,Used Nest or eggshells found (occupied or laid within period of survey)
FL,Confirmed,"Recently FLedged young (nidicolous species) or downy young (nidifugous species). Careful consideration should be given to the likely provenance of any fledged juvenile capable of significant geographical movement. Evidence of dependency on adults (e.g. feeding) is helpful. Be cautious, even if the record comes from suitable habitat."
ON,Confirmed,"Adults entering or leaving nest-site in circumstances indicating Occupied Nest (including high nests or nest holes, the contents of which can not be seen) or adults seen incubating"
FF,Confirmed,Adult carrying Faecal sac or Food for young
NE,Confirmed,Nest containing Eggs
NY,Confirmed,Nest with Young seen or heard
F,Non breeding,Flying over
M,Non breeding,Species observed but suspected to be still on Migration
U,Non breeding,Species observed but suspected to be sUmmering non-breeder`







// SPECIES STATUS
const statusData = `R,Resident and breeds
S,Summer breeder
s,Summer but non breeder
W,Winter visitor
P,Passage Only
r,resident but non breeder
C,Escaped/Reintroduced/Feral`

const ADD_SPECIES_STATUS = gql`
  mutation addSpeciesStatus($data: SpeciesStatusCreateInput!) {
    createSpeciesStatus(data: $data) {
      code
  }
}
`
// data: {
//   code: ,
//   description:     
// }







// SPECIES
const ADD_SPECIES = gql`
mutation addSpecies($data: SpeciesCreateInput!) {
  createSpecies(data: $data) {
      name
      class {
        name
      }
    }
  }
`
// data: {
//   name: data[0],
//   rarity: data[1],    
//   status: {
//     connect: [
//       {
//         id: data[2]
//       }
//     ]
//   },
//   class: {
//     connect: {
//       id: 'ck92znwwk1wa10933vy7q8810'
//     }
//   }
// }

const speciesData = `Red Throated Diver,5,ck9f93bsndz8m0940p3f3gv6c
Black Throated Diver,5,ck9f93bsndz8m0940p3f3gv6c
Little Grebe,2,ck9f938rmia6a0923e3ph7gjt
Great Crested Grebe,2,ck9f938rmia6a0923e3ph7gjt
Red Necked Grebe,5,ck9f93bsndz8m0940p3f3gv6c
Slavonian Grebe,5,ck9f93bsndz8m0940p3f3gv6c
Black Necked Grebe,4,ck9f93bsndz8m0940p3f3gv6c
Gannet,5,ck9f93bsndz8m0940p3f3gv6c
Cormorant,2,ck9f93cknia7h0923w78pkeb5
Shag,5,ck9f93bsndz8m0940p3f3gv6c
Bittern,3,ck9f93b0lia6z0923et8lo3yc
Cattle Egret,5,ck9f93bsndz8m0940p3f3gv6c
Little Egret,2,ck9f93cknia7h0923w78pkeb5
Great White Egret,4,ck9f93bsndz8m0940p3f3gv6c
Grey Heron,2,ck9f938rmia6a0923e3ph7gjt
White Stork,5,ck9f93bsndz8m0940p3f3gv6c
Glossy Ibis,5,ck9f93bsndz8m0940p3f3gv6c
Purple Heron,5,ck9f93bsndz8m0940p3f3gv6c
Spoonbill,5,ck9f93bsndz8m0940p3f3gv6c
Mute Swan,2,ck9f938rmia6a0923e3ph7gjt
Bewick's Swan,5,ck9f93bsndz8m0940p3f3gv6c
Whooper Swan,5,ck9f93bsndz8m0940p3f3gv6c
Taiga Bean Goose,5,ck9f93bsndz8m0940p3f3gv6c
Tundra Bean Goose,5,ck9f93bsndz8m0940p3f3gv6c
Pink-footed Goose,5,ck9f93bsndz8m0940p3f3gv6c
White-fronted Goose,4,ck9f93bsndz8m0940p3f3gv6c
Greylag Goose,1,ck9f938rmia6a0923e3ph7gjt
Canada Goose,1,ck9f938rmia6a0923e3ph7gjt
Brent Goose,3,ck9f93bsndz8m0940p3f3gv6c
Egyptian Goose,2,ck9f938rmia6a0923e3ph7gjt
Mandarin,2,ck9f938rmia6a0923e3ph7gjt
Wigeon,2,ck9f93b0lia6z0923et8lo3yc
Gadwall,2,ck9f938rmia6a0923e3ph7gjt
Teal,2,ck9f93b0lia6z0923et8lo3yc
Mallard,1,ck9f938rmia6a0923e3ph7gjt
Pintail,3,ck9f93bsndz8m0940p3f3gv6c
Garganey,3,ck9f93bsndz8m0940p3f3gv6c
Shoveler,2,ck9f93b0lia6z0923et8lo3yc
Red-crested Pochard,3,ck9f93bsndz8m0940p3f3gv6c
Pochard,2,ck9f93b0lia6z0923et8lo3yc
Tufted Duck,1,ck9f938rmia6a0923e3ph7gjt
Scaup,4,ck9f93bsndz8m0940p3f3gv6c
Eider,5,ck9f93bsndz8m0940p3f3gv6c
Long-tailed Duck,5,ck9f93bsndz8m0940p3f3gv6c
Common Scoter,4,ck9f93bsndz8m0940p3f3gv6c
Goldeneye,3,ck9f93b0lia6z0923et8lo3yc
Smew,4,ck9f93bsndz8m0940p3f3gv6c
Red-breasted Merganser,5,ck9f93bsndz8m0940p3f3gv6c
Ruddy Duck,1,ck9f93bsndz8m0940p3f3gv6c
Honey Buzzard,5,ck9f93bsndz8m0940p3f3gv6c
Red Kite,2,ck9f938rmia6a0923e3ph7gjt
Marsh Harrier,3,ck9f93bsndz8m0940p3f3gv6c
Hen Harrier,4,ck9f93bsndz8m0940p3f3gv6c
Montague's Harrier,5,ck9f93bsndz8m0940p3f3gv6c
Goshawk,5,ck9f93bsndz8m0940p3f3gv6c
Sparrowhawk,2,ck9f938rmia6a0923e3ph7gjt
Buzzard,2,ck9f938rmia6a0923e3ph7gjt
Osprey,4,ck9f93bsndz8m0940p3f3gv6c
Kestrel,3,ck9f93cknia7h0923w78pkeb5
Red-footed Falcon,5,ck9f93bsndz8m0940p3f3gv6c
Merlin,5,ck9f93bsndz8m0940p3f3gv6c
Hobby,3,ck9f93a8mdz820940wycbqb52
Peregrine,3,ck9f93cknia7h0923w78pkeb5
Red-legged Partridge,4,ck9f93bsndz8m0940p3f3gv6c
Grey Partridge,5,ck9f93bsndz8m0940p3f3gv6c
Quail,5,ck9f93bsndz8m0940p3f3gv6c
Pheasant,2,ck9f938rmia6a0923e3ph7gjt
Water Rail,2,ck9f93b0lia6z0923et8lo3yc
Spotted Crake,4,ck9f93bsndz8m0940p3f3gv6c
Moorhen,1,ck9f938rmia6a0923e3ph7gjt
Coot,1,ck9f938rmia6a0923e3ph7gjt
Common Crane,5,ck9f93bsndz8m0940p3f3gv6c
Oystercatcher,2,ck9f939gnia6j0923l0l6yn2i
Avocet,4,ck9f93bsndz8m0940p3f3gv6c
Little Ringed Plover,2,ck9f93a8mdz820940wycbqb52
Ringed Plover,3,ck9f93bsndz8m0940p3f3gv6c
Grey Plover,5,ck9f93bsndz8m0940p3f3gv6c
Lapwing,1,ck9f93cknia7h0923w78pkeb5
Knot,5,ck9f93bsndz8m0940p3f3gv6c
Sanderling,4,ck9f93bsndz8m0940p3f3gv6c
Little Stint,5,ck9f93bsndz8m0940p3f3gv6c
Temminck's Stint,5,ck9f93bsndz8m0940p3f3gv6c
Curlew Sandpiper,5,ck9f93bsndz8m0940p3f3gv6c
Dunlin,3,ck9f93bsndz8m0940p3f3gv6c
Ruff,4,ck9f93bsndz8m0940p3f3gv6c
Snipe,2,ck9f93b0lia6z0923et8lo3yc
Woodcock,3,ck9f93b0lia6z0923et8lo3yc
Black-tailed Godwit,3,ck9f93bsndz8m0940p3f3gv6c
Bar-tailed Godwit,5,ck9f93bsndz8m0940p3f3gv6c
Whimbrel,4,ck9f93bsndz8m0940p3f3gv6c
Curlew,4,ck9f93bsndz8m0940p3f3gv6c
Spotted Redshank,5,ck9f93bsndz8m0940p3f3gv6c
Greenshank,3,ck9f93bsndz8m0940p3f3gv6c
Green Sandpiper,2,ck9f93bsndz8m0940p3f3gv6c
Wood Sandpiper,3,ck9f93bsndz8m0940p3f3gv6c
Common Sandpiper,2,ck9f93bsndz8m0940p3f3gv6c
Turnstone,4,ck9f93bsndz8m0940p3f3gv6c
Grey Phalarope,5,ck9f93bsndz8m0940p3f3gv6c
Wilson's Phalarope,5,ck9f93bsndz8m0940p3f3gv6c
Arctic Skua,5,ck9f93bsndz8m0940p3f3gv6c
Little Gull,4,ck9f93bsndz8m0940p3f3gv6c
Sabine's Gull,5,ck9f93bsndz8m0940p3f3gv6c
Black-headed Gull,1,ck9f938rmia6a0923e3ph7gjt
Common Gull,2,ck9f93b0lia6z0923et8lo3yc
Lesser Black-backed Gull,2,ck9f93cknia7h0923w78pkeb5
Herring Gull,2,ck9f93cknia7h0923w78pkeb5
Yellow-legged Gull,3,ck9f93bsndz8m0940p3f3gv6c
Caspian Gull,5,ck9f93bsndz8m0940p3f3gv6c
Iceland Gull,5,ck9f93bsndz8m0940p3f3gv6c
Great Black-backed Gull,3,ck9f93b0lia6z0923et8lo3yc
Kittiwake,4,ck9f93bsndz8m0940p3f3gv6c
Sandwich Tern,3,ck9f93bsndz8m0940p3f3gv6c
Common Tern,1,ck9f939gnia6j0923l0l6yn2i
Arctic Tern,3,ck9f93bsndz8m0940p3f3gv6c
Little Tern,5,ck9f93bsndz8m0940p3f3gv6c
Black Tern,3,ck9f93bsndz8m0940p3f3gv6c
Rock Pigeon,2,ck9f938rmia6a0923e3ph7gjt
Stock Dove,2,ck9f938rmia6a0923e3ph7gjt
Wood Pigeon,1,ck9f938rmia6a0923e3ph7gjt
Collared Dove,2,ck9f938rmia6a0923e3ph7gjt
Turtle Dove,5,ck9f93bsndz8m0940p3f3gv6c
Ring-necked Parakeet,2,ck9f938rmia6a0923e3ph7gjt
Cuckoo,2,ck9f939gnia6j0923l0l6yn2i
Barn Owl,2,ck9f938rmia6a0923e3ph7gjt
Little Owl,3,ck9f93cknia7h0923w78pkeb5
Tawny Owl,2,ck9f938rmia6a0923e3ph7gjt
Short-eared Owl,5,ck9f93bsndz8m0940p3f3gv6c
Nightjar,5,ck9f93bsndz8m0940p3f3gv6c
Swift,1,ck9f93a8mdz820940wycbqb52
Alpine Swift,5,ck9f93bsndz8m0940p3f3gv6c
Kingfisher,2,ck9f938rmia6a0923e3ph7gjt
Wryneck,5,ck9f93bsndz8m0940p3f3gv6c
Green Woodpecker,2,ck9f938rmia6a0923e3ph7gjt
Great Spotted Woodpecker,2,ck9f938rmia6a0923e3ph7gjt
Lesser Spotted Woodpecker,4,ck9f938rmia6a0923e3ph7gjt
Woodlark,5,ck9f93bsndz8m0940p3f3gv6c
Skylark,2,ck9f938rmia6a0923e3ph7gjt
Sand Martin,1,ck9f939gnia6j0923l0l6yn2i
Swallow,1,ck9f939gnia6j0923l0l6yn2i
House Martin,1,ck9f939gnia6j0923l0l6yn2i
Tree Pipit,4,ck9f93bsndz8m0940p3f3gv6c
Rock Pipit,5,ck9f93bsndz8m0940p3f3gv6c
Water Pipit,4,ck9f93bsndz8m0940p3f3gv6c
Yellow Wagtail,3,ck9f93bsndz8m0940p3f3gv6c
Grey Wagtail,2,ck9f938rmia6a0923e3ph7gjt
Pied Wagtail,1,ck9f938rmia6a0923e3ph7gjt
Waxwing,5,ck9f93bsndz8m0940p3f3gv6c
Dipper,5,ck9f93bsndz8m0940p3f3gv6c
Wren,1,ck9f938rmia6a0923e3ph7gjt
Dunnock,1,ck9f938rmia6a0923e3ph7gjt
Robin,1,ck9f938rmia6a0923e3ph7gjt
Nightingale,3,ck9f939gnia6j0923l0l6yn2i
Black Redstart,5,ck9f93bsndz8m0940p3f3gv6c
Redstart,3,ck9f93bsndz8m0940p3f3gv6c
Whinchat,3,ck9f93bsndz8m0940p3f3gv6c
Stonechat,3,ck9f93bsndz8m0940p3f3gv6c
Northern Wheatear,3,ck9f93bsndz8m0940p3f3gv6c
Ring Ouzel,5,ck9f93bsndz8m0940p3f3gv6c
Blackbird,1,ck9f938rmia6a0923e3ph7gjt
Fieldfare,2,ck9f93b0lia6z0923et8lo3yc
Song Thrush,1,ck9f938rmia6a0923e3ph7gjt
Redwing,2,ck9f93b0lia6z0923et8lo3yc
Mistle Thrush,2,ck9f938rmia6a0923e3ph7gjt
Cetti's Warbler,2,ck9f938rmia6a0923e3ph7gjt
Grasshopper Warbler,4,ck9f93bsndz8m0940p3f3gv6c
Sedge Warbler,2,ck9f939gnia6j0923l0l6yn2i
Marsh Warbler,5,ck9f93bsndz8m0940p3f3gv6c
Reed Warbler,1,ck9f939gnia6j0923l0l6yn2i
Lesser Whitethroat,3,ck9f939gnia6j0923l0l6yn2i
Whitethroat,1,ck9f939gnia6j0923l0l6yn2i
Garden Warbler,2,ck9f939gnia6j0923l0l6yn2i
Blackcap,1,ck9f939gnia6j0923l0l6yn2i
Yellow Browed Warbler,5,ck9f93bsndz8m0940p3f3gv6c
Wood Warbler,5,ck9f93bsndz8m0940p3f3gv6c
Chiffchaff,1,ck9f939gnia6j0923l0l6yn2i
Willow Warbler,2,ck9f93bsndz8m0940p3f3gv6c
Goldcrest,1,ck9f938rmia6a0923e3ph7gjt
Spotted Flycatcher,3,ck9f93bsndz8m0940p3f3gv6c
Pied Flycatcher,5,ck9f93bsndz8m0940p3f3gv6c
Bearded Tit,5,ck9f93bsndz8m0940p3f3gv6c
Long-tailed Tit,1,ck9f938rmia6a0923e3ph7gjt
Marsh Tit,5,ck9f93bsndz8m0940p3f3gv6c
Willow Tit,5,ck9f93bsndz8m0940p3f3gv6c
Coal Tit,3,ck9f938rmia6a0923e3ph7gjt
Blue Tit,1,ck9f938rmia6a0923e3ph7gjt
Great Tit,1,ck9f938rmia6a0923e3ph7gjt
Nuthatch,2,ck9f938rmia6a0923e3ph7gjt
Treecreeper,2,ck9f938rmia6a0923e3ph7gjt
Great Grey Shrike,5,ck9f93bsndz8m0940p3f3gv6c
Jay,2,ck9f938rmia6a0923e3ph7gjt
Magpie,1,ck9f938rmia6a0923e3ph7gjt
Jackdaw,1,ck9f938rmia6a0923e3ph7gjt
Rook,2,ck9f938rmia6a0923e3ph7gjt
Carrion Crow,1,ck9f938rmia6a0923e3ph7gjt
Raven,3,ck9f93cknia7h0923w78pkeb5
Starling,2,ck9f938rmia6a0923e3ph7gjt
House Sparrow,2,ck9f938rmia6a0923e3ph7gjt
Tree Sparrow,5,ck9f93bsndz8m0940p3f3gv6c
Chaffinch,1,ck9f938rmia6a0923e3ph7gjt
Hawfinch,5,ck9f93bsndz8m0940p3f3gv6c
Greenfinch,1,ck9f938rmia6a0923e3ph7gjt
Goldfinch,1,ck9f938rmia6a0923e3ph7gjt
Siskin,2,ck9f93b0lia6z0923et8lo3yc
Linnet,3,ck9f93bsndz8m0940p3f3gv6c
Mealy Redpoll,5,ck9f93bsndz8m0940p3f3gv6c
Crossbill,5,ck9f93bsndz8m0940p3f3gv6c
Bullfinch,2,ck9f938rmia6a0923e3ph7gjt
Yellowhammer,5,ck9f93bsndz8m0940p3f3gv6c
Reed Bunting,1,ck9f938rmia6a0923e3ph7gjt
Corn Bunting,5,ck9f93bsndz8m0940p3f3gv6c`




const results = readString(locationData)
console.log(results.data)

function Add() {
  let input;
  const [addRecord, { data }] = useMutation(ADD_LOCATION);

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
                  siteCode: data[0],
                  site: data[1],
                  gridRef: data[2]     
                }
               } 
               });   
               console.log('Complete: ', data[0])                       
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
