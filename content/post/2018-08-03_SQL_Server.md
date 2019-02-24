---
title: "SQL Server"
url: "SQL Server"
output: html_notebook
editor_options: 
  chunk_output_type: inline
date: 2018-10-07
thumbnail: "img/banner/sql_server.png"
categories:
  - "post"
tags: 
  - "visualization"
draft: false
---

## Actual Execution Plan

![Figure 3: Organization of teams driven by business capabilities](/img/actual_exec_plan1.png)

*Figure 3: Organization of teams driven by business capabilities*
 
 ![Figure 3: Organization of teams driven by business capabilities](/img/actual_exec_plan2.png)

*Figure 3: Organization of teams driven by business capabilities*

### Add user to Managed Instance

{{< highlight sql >}}create user DataScienceCore from external provider
{{< /highlight >}} 

## Clustered vs  Non-Clustered Index

There are two types of Indexes in SQL Server:

1. Clustered Index
2. Non-Clustered Index 

### Clustered Index

A clustered index defines the order in which data is physically stored in a table. Table data can be sorted in only way, therefore, there can be only one clustered index per table. In SQL Server, the primary key constraint automatically creates a clustered index on that particular column. 

### Non-Clustered Indexes

A non-clustered index doesn’t sort the physical data inside the table. In fact, a non-clustered index is stored at one place and table data is stored in another place. This is similar to a textbook where the book content is located in one place and the index is located in another. This allows for more than one non-clustered index per table. 

#### Differences

1. There can be only one clustered index per table. However, you can create multiple non-clustered indexes on a single table.
2. Clustered indexes only sort tables. Therefore, they do not consume extra storage. Non-clustered indexes are stored in a separate place from the actual table claiming more storage space.
3. Clustered indexes are faster than non-clustered indexes since they don’t involve any extra lookup step. 

Source: https://www.sqlshack.com/what-is-the-difference-between-clustered-and-non-clustered-indexes-in-sql-server/