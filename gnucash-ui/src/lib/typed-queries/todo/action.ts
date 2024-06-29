import { sql } from "@pgtyped/runtime";

// Get all OWNED todos for $userEmail along with the latest status and the latest comment on
export const getTodosWithLatestStatuses = sql`
SELECT t.id as task_id, t.title, t.description, st.status as status, sp.name as space_name, u.name as owner_name, com.*
FROM todos t
LEFT OUTER  JOIN (
   SELECT DISTINCT ON (sti.todo_id) *
   FROM status_transitions sti
   ORDER BY sti.todo_id, sti.created_at DESC
)  st ON st.todo_id = t.id
LEFT OUTER JOIN (
    SELECT DISTINCT ON (co.commentee_id)  co.commentee_id, comments.comment  
    from commentables co 
    inner join comments on 
        comments.id = co.comment_id 
    ORDER BY co.commentee_id, comments.created_at DESC
) com on com.commentee_id = t.id
INNER JOIN spaces sp on 
    sp.id = t.space_id
INNER JOIN users u on 
    sp.owner_id = u.id and u.email = $userEmail
order by t.id
limit $limit
offset $offset    ;
`;

// Insert a bunch of comments by returning the ids created. 
export const seed_insertManyCommentsIntoTodo = sql`
insert into comments (comment, user_id)
    values $$todos(commentContent, userId)
    returning comments.id
`;

//Get all comments for todos
export const getCommentsForTodo = sql`
select c.*, u.email as commented_by, t.title  from 
 comments c 
Inner join commentables co on 
    co.comment_id = c.id  and 
    co.commentee_id = $todoId and 
    co.commentee_type = 'Todo'
 inner join users u on 
    c.user_id = u.id 
inner join todos t on 
    t.id = $todoId
`;

