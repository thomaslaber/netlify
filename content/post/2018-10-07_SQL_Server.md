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

## Columnstore

A columnstore index can provide a very high level of data compression, typically by 10 times, to significantly reduce your data warehouse storage cost. For analytics, a columnstore index offers an order of magnitude better performance than a btree index. Columnstore indexes are the preferred data storage format for data warehousing and analytics workloads. Starting with SQL Server 2016 (13.x), you can use columnstore indexes for real-time analytics on your operational workload.

### Reasons why columnstore indexes are so fast

* Columns store values from the same domain and commonly have similar values, which result in high compression rates. I/O bottlenecks in your system are minimized or eliminated, and memory footprint is reduced significantly.
* High compression rates improve query performance by using a smaller in-memory footprint. In turn, query performance can improve because SQL Server can perform more query and data operations in memory.
* Batch execution improves query performance, typically by two to four times, by processing multiple rows together.
* Queries often select only a few columns from a table, which reduces total I/O from the physical media.

### Recommended use cases:

* Use a clustered columnstore index to store fact tables and large dimension tables for data warehousing workloads. This method improves query performance and data compression by up to 10 times. 
* Use a nonclustered columnstore index to perform analysis in real time on an OLTP workload. 

### Terminology 

<dl>
<dt>Columnstore</dt>
<dd>
A columnstore is data that's logically organized as a table with rows and columns, and physically stored in a column-wise data format.
</dd>
<dt>Rowstore</dt>
<dd>
A rowstore is data that's logically organized as a table with rows and columns, and physically stored in a row-wise data format. This format is the traditional way to store relational table data. In SQL Server, rowstore refers to a table where the underlying data storage format is a heap, a clustered index, or a memory-optimized table.
</dd>
source: https://docs.microsoft.com/en-us/sql/relational-databases/indexes/columnstore-indexes-overview?view=sql-server-2017

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

## Actual Execution Plan

![Figure 3: Organization of teams driven by business capabilities](/img/sql_server/actual_exec_plan1.png)

*Figure 3: Organization of teams driven by business capabilities*
 
 ![Figure 3: Organization of teams driven by business capabilities](/img/sql_server/actual_exec_plan2.png)

*Figure 3: Organization of teams driven by business capabilities*

### Add user to Managed Instance

{{< highlight sql >}}create user DataScienceCore from external provider
{{< /highlight >}} 
