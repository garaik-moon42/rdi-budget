# RDI_BUDGET Enterprise Planning Google Sheets Supporting Scripts

This project contains supporting scripts for the **RDI_BUDGET** ERP Google Sheets used by **MOON42**.

To transpile and upload these scripts to Google Sheets, you'll need [Google Clasp](https://github.com/google/clasp).

Rather than installing it locally, we recommend using a Docker container. Here's how:

1. Navigate to the project directory.
2. Run a Docker container with Node and open a shell in the project directory:
    - **Windows PowerShell**:
      ```sh
      docker run -v "${PWD}:/home/rdi_budget" -w /home/rdi_budget -it --rm --entrypoint sh node:22-alpine
      ```
    - **Windows Command Prompt**:
      ```sh
      docker run -v "%cd%:/home/rdi_budget" -w /home/rdi_budget -it --rm --entrypoint sh node:22-alpine
      ```
    - **Linux/macOS**:
      ```sh
      docker run -v "$(pwd):/home/rdi_budget" -w /home/rdi_budget -it --rm --entrypoint sh node:22-alpine
      ```
3. Inside the container, install dependencies configured in `package.json`
   ```sh
   npm install
   ```
4. Log in to Google services to enable project upload:
   ```sh
   npm run login
   ```  
   The `--no-localhost` option tells Clasp that you cannot run a local server for the login callback and prefer to enter the authentication code manually. Follow the prompt instructions.
5. You're now ready to transpile and upload the project:
   ```sh
   npm run push
   ```  
6. Or alternatively you can start a watcher:
   ```sh
   npm run watch
   ```  
   
---