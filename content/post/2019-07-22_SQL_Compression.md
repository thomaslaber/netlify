---
title: "SQL Server Advanced"
url: "SQL Server"
output: html_notebook
editor_options: 
  chunk_output_type: inline
date: 2019-07-22
thumbnail: "img/banner/sql_server.png"
categories:
  - "post"
tags: 
  - SQL
draft: false
---

Sometimes you have a series of stored procedures that themselves are managed by another master stored procedure like so. This usually just means a series of `EXEC` statements after each other. It is quite handy to create a login event after each stored procedure call in order to check its progress.

## Logging with try-catch

{{< highlight sql >}}

CREATE PROCEDURE loging
AS
	BEGIN
	DECLARE @LogText nvarchar(max)

	EXEC Staging.SpVV_logIns 'procedure_name_to_log', 'START', null, 'I'

	BEGIN TRY
		begin tran
		--sql code

		commit

		EXEC Staging.SpVV_logIns 'procedure_name_to_log', 'END', '', 'I'
	END TRY

	BEGIN CATCH
		IF @@TRANCOUNT > 0
		ROLLBACK

		DECLARE @ErrorMessage nvarchar(4000);
		DECLARE @ErrorSeverity int;
		DECLARE @ErrorState int;

		SET @ErrorMessage = ERROR_MESSAGE() + ' Line-Nr.: ' + cast(Error_line() as varchar(10))
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState = ERROR_STATE()

		SET @LogText = 'Msg.: ' + @ErrorMessage + ', Sev.: ' + cast(@ErrorSeverity as varchar(3)) + 'State: ' + cast(@ErrorState as varchar(10))
		EXEC Staging.SpVV_logIns 'procedure_name_to_log', 'Exception', @LogText, 'E'

		RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

		RETURN 0
	END CATCH
END

{{< /highlight >}} 


## Compression

In order to save valuable storage space it makes sense to compress certain tables. TBC

More information here: https://docs.microsoft.com/en-us/sql/relational-databases/data-compression/data-compression?view=sql-server-2017

{{< highlight sql >}}

CREATE TABLE [dbo].[table_name] (
	[ShipmentId] [bigint] NOT NULL,
	[Name] [nvarchar](40) NULL,
	[Time] [datetime2](3) NULL
) ON [PRIMARY] with (data_compression=page)
GO

INSERT 
	INTO table_name ([ShipmentId], [Name], [Time])
SELECT
	[ShipmentId], [Name], [Time]
	FROM origin_table
	WHERE [Name] = 'thomas'

{{< /highlight >}} 
