import { sql } from "@pgtyped/runtime";

//Get OWNER space names for userId and space name filter
export const getUserSpaces = sql`
select u.email, s.name
from users u
inner join spaces s on 
    s.owner_id = u.id 
where u.id = $userId and 
($spaceName :: TEXT is null or s.name ILIKE  '%'||$spaceName||'%' ) and
($spaceId :: NUMERIC is null or s.id = $spaceId )
`

export const getSharedUserSpaces = sql`
select u.email, s.name
from users u
inner join user_space us on 
    us.user_id = u.id      
inner join spaces s on 
    us.space_id = s.id 
where u.id = $userId and 
($spaceName :: TEXT is null or s.name ILIKE  '%'||$spaceName||'%' ) and
($spaceId :: NUMERIC is null or s.id = $spaceId )
`

