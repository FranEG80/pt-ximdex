# Prueba Técnica Ximdex
## Profits calculator
This tool will return the benefits of the products according to the sales obtained from a CSV file and according to the sales formulas of a JSON file. You can run this tool with script shell `profits.sh` or you can run with npm program
### 1. Requisites
To initialize the tool, you will need:
* Git >= 2.30.0
* NodeJS >= 15.0
* npm >= 7.0
* Download this repository at your local machine

### 2. Installing
You can follow these steps:
  * Download this repository
    ```
    git clone https://github.com/FranEG80/pt-ximdex.git
    ```
  * Install the dependencies
    ```
    $ cd pt-ximdex
    $ cd ximdex-node
    $ npm install
    ```

### 3. Help
You can pass these arguments to execution:
  * logistic: path to logistic data file in CSV
  * commercial: path to commercial data file in JSON
  * persistence: save log at dir /logs/profits_logs_{DATE}.log (OPTIONAL)
  * log trace: set Log level trace, values: LEVEL_INFO | LEVEL_ERROR | LEVEL_DEBUG (OPTIONAL)
  * output: save the output in a file. If value is 'true' o none the file by default is profits_output_{DATE}.log (OPTIONAL)

### 4. Running the tool
  * script shell **profits.sh**
    In this script the abbreviate arguments are:
      * -p: persistence
      * -t: log-trace
      * -o: output
      * -h: show help for usage

   Usage:

    ```
    $ ./profits.sh -logistic <string> -commercial <string> [-p] [-l <LEVEL_INFO|LEVEL_ERROR|LEVEL_DEBUG>] [-o <true|path_to_output>] [-h]
    ```
  * **npm**

   Usage:
    ```
    $ cd ximdex-node
    $ npm run start --logistic=<string> --commercial=<string> --persistence --logtrace --output=<true|string>
    ```
