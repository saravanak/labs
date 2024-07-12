import { sql } from '@pgtyped/runtime';

//Get OWNER space names for userId and space name filter
export const sql_getAllSpaces = sql`
with x as (
    select count(t.id), s.id, s.name
    from users u
    inner join spaces s on 
        s.owner_id = u.id 
    left outer join todos t on 
        t.space_id = s.id
    where u.email = $email
    group by s.name, s.id
    
    UNION 
    
    select count(t.id), s.id, s.name
    from users u
    inner join user_space us on 
        us.user_id = u.id      
    inner join spaces s on 
        us.space_id = s.id 
    left outer join todos t on 
        t.space_id = s.id
    
    where u.email = $email
    group by s.name, s.id
    )
    select * from x 
    order by x.id 
    limit $limit offset $cursor
    
    `;

// Share  a bunch of spaces by returning the ids created.
export const seed_shareMany = sql`
insert into user_space (user_id, space_id)
    values $$userSpaces(userId, spaceId)
    returning user_space.id
`;
