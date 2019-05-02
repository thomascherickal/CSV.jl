var documenterSearchIndex = {"docs":
[{"location":"#CSV.jl-Documentation-1","page":"Home","title":"CSV.jl Documentation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"CSV.jl is built to be a fast and flexible pure-Julia library for handling delimited text files.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"CSV.File\nCSV.read\nCSV.validate\nCSV.write","category":"page"},{"location":"#CSV.File","page":"Home","title":"CSV.File","text":"CSV.File(source; kwargs...) => CSV.File\n\nRead a csv input (a filename given as a String or FilePaths.jl type, or any other IO source), returning a CSV.File object. Opens the file and uses passed arguments to detect the number of columns and column types. The returned CSV.File object supports the Tables.jl interface and can iterate CSV.Rows. CSV.Row supports propertynames and getproperty to access individual row values. Note that duplicate column names will be detected and adjusted to ensure uniqueness (duplicate column name a will become a_1). For example, one could iterate over a csv file with column names a, b, and c by doing:\n\nfor row in CSV.File(file)\n    println(\"a=$(row.a), b=$(row.b), c=$(row.c)\")\nend\n\nBy supporting the Tables.jl interface, a CSV.File can also be a table input to any other table sink function. Like:\n\n# materialize a csv file as a DataFrame\ndf = CSV.File(file) |> DataFrame!\n\n# load a csv file directly into an sqlite database table\ndb = SQLite.DB()\ntbl = CSV.File(file) |> SQLite.load!(db, \"sqlite_table\")\n\nSupported keyword arguments include:\n\nFile layout options:\nheader=1: the header argument can be an Int, indicating the row to parse for column names; or a Range, indicating a span of rows to be concatenated together as column names; or an entire Vector{Symbol} or Vector{String} to use as column names; if a file doesn't have column names, either provide them as a Vector, or set header=0 or header=false and column names will be auto-generated (Column1, Column2, etc.)\nnormalizenames=false: whether column names should be \"normalized\" into valid Julia identifier symbols; useful when iterating rows and accessing column values of a row via getproperty (e.g. row.col1)\ndatarow: an Int argument to specify the row where the data starts in the csv file; by default, the next row after the header row is used. If header=0, then the 1st row is assumed to be the start of data\nskipto::Int: similar to datarow, specifies the number of rows to skip before starting to read data\nfooterskip::Int: number of rows at the end of a file to skip parsing\nlimit: an Int to indicate a limited number of rows to parse in a csv file; use in combination with skipto to read a specific, contiguous chunk within a file\ntranspose::Bool: read a csv file \"transposed\", i.e. each column is parsed as a row\ncomment: rows that begin with this String will be skipped while parsing\nuse_mmap::Bool=!Sys.iswindows(): whether the file should be mmapped for reading, which in some cases can be faster\nParsing options:\nmissingstrings, missingstring: either a String, or Vector{String} to use as sentinel values that will be parsed as missing; by default, only an empty field (two consecutive delimiters) is considered missing\ndelim=',': a Char or String that indicates how columns are delimited in a file; if no argument is provided, parsing will try to detect the most consistent delimiter on the first 10 rows of the file\nignorerepeated::Bool=false: whether repeated (consecutive) delimiters should be ignored while parsing; useful for fixed-width files with delimiter padding between cells\nquotechar='\"', openquotechar, closequotechar: a Char (or different start and end characters) that indicate a quoted field which may contain textual delimiters or newline characters\nescapechar='\"': the Char used to escape quote characters in a quoted field\ndateformat::Union{String, Dates.DateFormat, Nothing}: a date format string to indicate how Date/DateTime columns are formatted for the entire file\ndecimal='.': a Char indicating how decimals are separated in floats, i.e. 3.14 used '.', or 3,14 uses a comma ','\ntruestrings, falsestrings: Vectors of Strings that indicate how true or false values are represented; by default only true and false are treated as Bool\nColumn Type Options:\ntype: a single type to use for parsing an entire file; i.e. all columns will be treated as the same type; useful for matrix-like data files\ntypes: a Vector or Dict of types to be used for column types; a Dict can map column index Int, or name Symbol or String to type for a column, i.e. Dict(1=>Float64) will set the first column as a Float64, Dict(:column1=>Float64) will set the column named column1 to Float64 and, Dict(\"column1\"=>Float64) will set the column1 to Float64; if a Vector if provided, it must match the # of columns provided or detected in header\ntypemap::Dict{Type, Type}: a mapping of a type that should be replaced in every instance with another type, i.e. Dict(Float64=>String) would change every detected Float64 column to be parsed as String\ncategorical::Union{Bool, Float64}=false: if true, columns detected as String are returned as a CategoricalArray; alternatively, the proportion of unique values below which String columns should be treated as categorical (for example 0.1 for 10%, which means if the # of unique strings in a column is under 10%, it will be parsed as a CategoricalArray)\npool::Union{Bool, Float64}=0.1: if true, columns detected as String are returned as a PooledArray; alternatively, the proportion of unique values below which String columns should be pooled (by default 0.1, meaning that if the # of unique strings in a column is under 10%, it will be pooled)\nstrict::Bool=false: whether invalid values should throw a parsing error or be replaced with missing\nsilencewarnings::Bool=false: if strict=false, whether invalid value warnings should be silenced\n\n\n\n\n\n","category":"type"},{"location":"#CSV.read","page":"Home","title":"CSV.read","text":"CSV.read(source; kwargs...) => DataFrame\n\nParses a delimited file into a DataFrame.\n\nPositional arguments:\n\nsource: can be a file name (String or FilePaths.jl type) of the location of the csv file or an IO or Vector{UInt8} buffer to read the csv from directly\n\nSupported keyword arguments include:\n\nFile layout options:\nheader=1: the header argument can be an Int, indicating the row to parse for column names; or a Range, indicating a span of rows to be concatenated together as column names; or an entire Vector{Symbol} or Vector{String} to use as column names; if a file doesn't have column names, either provide them as a Vector, or set header=0 or header=false and column names will be auto-generated (Column1, Column2, etc.)\nnormalizenames=false: whether column names should be \"normalized\" into valid Julia identifier symbols; useful when iterating rows and accessing column values of a row via getproperty (e.g. row.col1)\ndatarow: an Int argument to specify the row where the data starts in the csv file; by default, the next row after the header row is used. If header=0, then the 1st row is assumed to be the start of data\nskipto::Int: similar to datarow, specifies the number of rows to skip before starting to read data\nfooterskip::Int: number of rows at the end of a file to skip parsing\nlimit: an Int to indicate a limited number of rows to parse in a csv file; use in combination with skipto to read a specific, contiguous chunk within a file\ntranspose::Bool: read a csv file \"transposed\", i.e. each column is parsed as a row\ncomment: rows that begin with this String will be skipped while parsing\nuse_mmap::Bool=!Sys.iswindows(): whether the file should be mmapped for reading, which in some cases can be faster\nParsing options:\nmissingstrings, missingstring: either a String, or Vector{String} to use as sentinel values that will be parsed as missing; by default, only an empty field (two consecutive delimiters) is considered missing\ndelim=',': a Char or String that indicates how columns are delimited in a file; if no argument is provided, parsing will try to detect the most consistent delimiter on the first 10 rows of the file\nignorerepeated::Bool=false: whether repeated (consecutive) delimiters should be ignored while parsing; useful for fixed-width files with delimiter padding between cells\nquotechar='\"', openquotechar, closequotechar: a Char (or different start and end characters) that indicate a quoted field which may contain textual delimiters or newline characters\nescapechar='\"': the Char used to escape quote characters in a quoted field\ndateformat::Union{String, Dates.DateFormat, Nothing}: a date format string to indicate how Date/DateTime columns are formatted for the entire file\ndecimal='.': a Char indicating how decimals are separated in floats, i.e. 3.14 used '.', or 3,14 uses a comma ','\ntruestrings, falsestrings: Vectors of Strings that indicate how true or false values are represented; by default only true and false are treated as Bool\nColumn Type Options:\ntype: a single type to use for parsing an entire file; i.e. all columns will be treated as the same type; useful for matrix-like data files\ntypes: a Vector or Dict of types to be used for column types; a Dict can map column index Int, or name Symbol or String to type for a column, i.e. Dict(1=>Float64) will set the first column as a Float64, Dict(:column1=>Float64) will set the column named column1 to Float64 and, Dict(\"column1\"=>Float64) will set the column1 to Float64; if a Vector if provided, it must match the # of columns provided or detected in header\ntypemap::Dict{Type, Type}: a mapping of a type that should be replaced in every instance with another type, i.e. Dict(Float64=>String) would change every detected Float64 column to be parsed as String\ncategorical::Union{Bool, Float64}=false: if true, columns detected as String are returned as a CategoricalArray; alternatively, the proportion of unique values below which String columns should be treated as categorical (for example 0.1 for 10%, which means if the # of unique strings in a column is under 10%, it will be parsed as a CategoricalArray)\npool::Union{Bool, Float64}=0.1: if true, columns detected as String are returned as a PooledArray; alternatively, the proportion of unique values below which String columns should be pooled (by default 0.1, meaning that if the # of unique strings in a column is under 10%, it will be pooled)\nstrict::Bool=false: whether invalid values should throw a parsing error or be replaced with missing\nsilencewarnings::Bool=false: if strict=false, whether invalid value warnings should be silenced\n\n\n\n\n\n","category":"function"},{"location":"#CSV.write","page":"Home","title":"CSV.write","text":"CSV.write(file, file; kwargs...) => file\ntable |> CSV.write(file; kwargs...) => file\n\nWrite a Tables.jl interface input to a csv file, given as an IO argument or String/FilePaths.jl type representing the file name to write to.\n\nKeyword arguments include:\n\ndelim::Union{Char, String}=',': a character or string to print out as the file's delimiter\nquotechar::Char='\"': ascii character to use for quoting text fields that may contain delimiters or newlines\nopenquotechar::Char: instead of quotechar, use openquotechar and closequotechar to support different starting and ending quote characters\nescapechar::Char='\"': ascii character used to escape quote characters in a text field\nmissingstring::String=\"\": string to print \ndateformat=Dates.default_format(T): the date format string to use for printing out Date & DateTime columns\nappend=false: whether to append writing to an existing file/IO, if true, it will not write column names by default\nwriteheader=!append: whether to write an initial row of delimited column names, not written by default if appending\nheader: pass a list of column names (Symbols or Strings) to use instead of the column names of the input table\n`newline='\n\n'`: character or string to use to separate rows (lines in the csv file)\n\nquotestrings=false: whether to force all strings to be quoted or not\ndecimal='.': character to use as the decimal point when writing floating point numbers\n\n\n\n\n\n","category":"function"}]
}