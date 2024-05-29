--Queries on the sqlite DB at /home/saro/projects/gnucash-web/saro-accounts-sqlite.gnucash


-- 1. Account fullname :: CTE 


create view account_full_names(name , guid) as 
WITH RECURSIVE path(name, guid) as (
    select null as name, guid 
        from accounts where name ='Root Account'
    union all 
    select case when path.name is null then accounts.name else concat(path.name, '.', accounts.name)  end as  name, accounts.guid
    from accounts 
    join path on path.guid = accounts.parent_guid
)
select name, guid from path where name is not null;