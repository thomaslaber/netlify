---
title: "Oracle's PLSQL"
url: "oracle plsql"
editor_options: 
  chunk_output_type: inline
date: 2019-12-13
thumbnail: img/banner/template.png
categories:
  - "post"
tags:
  - "sql"
draft: true
---
PL/SQL is a powerful, yet straightforward database programming language. It is easy to both write and read, and comes packed with lots of out-of-the-box optimizations and security features.

{{< highlight sql >}}
BEGIN
  DBMS_OUTPUT.put_line ('Hello World!');
END;
{{< /highlight >}}

source: https://blogs.oracle.com/oraclemagazine/building-with-blocks

## Explain Plan vs. Autotrace

Explain plan and autotrace produce similar results (both of them display an execution plan), but there are two key differences:

    The plan displayed by explain plan is the one that the database “thinks” or predicts it will use to run the query, whereas the plan displayed by autotrace is the plan that was actually used to run the query (at least that is the case when using autotrace in SQL Developer), and that is why in some cases you can get different plans for the same query depending on how you generate it.
    Besides the execution plan, autotrace displays some statistics or metrics about each of the steps performed to execute the query, which can be very useful in investigating performance issues.

That is why I prefer to use autotrace over explain plan in most situations. The only disadvantage of autotrace could be that it actually executes the statement, so if you want to see the execution plan for a query that takes a very long time to run, you would get it much faster by using explain plan.

## The Optimizer

The software or process in the database that is in charge of generating execution plans for every statement that needs to be executed is called “The Optimizer“. It usually generates more than one execution plan for every statement, and then, it tries to estimate which of the candidate plans would be more efficient.

source: http://sql.standout-dev.com/2016/01/understanding-querys-execution-plan/