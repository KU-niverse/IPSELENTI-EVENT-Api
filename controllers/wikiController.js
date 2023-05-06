const Wiki_history = require("../models/wikiModel.js");
const fs = require("fs");

// 전체 글 불러오기 + 수정 시 기존 전체 텍스트 불러오기
exports.contentsGetMid = async (req, res) => {
    const rows = await Wiki_history.readRecent();
    let jsonData = {};

    // 가장 최근 버전의 파일 읽어서 jsonData에 저장
    fs.readFile(`./documents/${rows[0].text_pointer}.wiki`, 'utf8', (err, data) => {
        // 없는 파일 요청 시 에러 처리
        if (err) {
            res.status(404).send({
                message: "File not found"
            });
            return;
        }

        const lines = data.split(/\r?\n/);
        const text = lines.join('\n');

        jsonData['version'] = rows[0].text_pointer;
        jsonData['text'] = text;
        res.status(200).send(jsonData);
    });
};

// 전체 글 수정하기
exports.contentsPostMid = async (req, res) => {
    // 빈 내용 요청 시 에러 처리
    if (req.body) {
        res.status(400).send({
            message: "Content can't be empty"
        });
        return;
    }

    const rows = await Wiki_history.readRecent();
    // 버전 불일치 시 에러 처리(누가 이미 수정했을 경우)
    if (req.body.version != rows[0].text_pointer) {
        res.status(426).send({
            message: "Version is not matched",
            newContent: req.body.newContent
        });
        return;
    }

    // 전체 글 저장하는 새 파일(버전) 만들기
    const latestVersion = parseInt(rows[0].text_pointer.substring(1));
    const updatedFileName = `./document/r${latestVersion + 1}.wiki`;
    const newContent = req.body.newContent;


    fs.writeFile(updatedFileName, newContent, (err) => {
        // 파일 쓰다가 에러난 경우
        if (err) {
            res.status(432).send({
                message: "Something went wrong while writing file",
                newContent: req.body.newContent
            });
            return;
        }
        console.log('The file has been updated!');
    });


    // 새로운 히스토리 생성
    const newWiki_history = new Wiki_history({
        editor_id: req.body.editor_id,
        text_pointer: `r${latestVersion + 1}`,
        is_rollback: 0
    });


    const rows_history = await Wiki_history.create(newWiki_history);


    // TODO : point 주는 api 요청
};


// 수정 시 기존 섹션 텍스트 불러오기
exports.contentsSectionGetMid = async (req, res) => {
    const rows = await Wiki_history.readRecent();
    let sections = [];

    // 정규화로 섹션 분리
    fs.readFile(`./documents/${rows[0].text_pointer}.wiki`, 'utf8', (err, contents) => {
        // 없는 파일 요청 시 에러 처리
        if (err) {
            res.status(404).send({
                message: "File not found"
            });
            return;
        }

        const lines = contents.split(/\r?\n/);
        let currentSection = null;
        let currentContent = null;

        for (let line of lines) {
            const matches = line.match(/^(\={2,})\s+(.+?)\s+\1\s*$/); // 정규식 패턴에 맞는지 검사합니다.
            if (matches !== null) { // 해당 라인이 섹션 타이틀인 경우
                if (currentSection !== null) {
                    currentSection.content.push(currentContent);
                    sections.push(currentSection);
                }
                currentSection = {
                    title: line,
                    content: []
                };
                currentContent = '';
            } else { // 해당 라인이 섹션 내용인 경우
                if (currentContent !== '') {
                    currentContent += '\n';
                }
                currentContent += line;
            }
        }

        if (currentSection !== null) {
            currentSection.content.push(currentContent);
            sections.push(currentSection);
        }

        // 섹션 번호에 맞는 섹션 불러오기, 유효하지 않은 번호일 경우 에러 처리
        try {
            section = sections[parseInt(req.params.section) - 1];
            console.log(sections)
            jsonData = {};
            jsonData['version'] = rows[0].text_pointer;
            jsonData['title'] = section.title;
            jsonData['content'] = section.content.join('\n');
            res.status(200).send(jsonData)
        } catch (err) {
            res.status(422).send({ error: 'Invalid section number' });
        };
    });


};

// 섹션 수정하기
exports.contentsSectionPostMid = async (req, res) => {
    // 빈 내용 요청 시 에러 처리
    if (req.body) {
        res.status(400).send({
            message: "Content can't be empty"
        });
    }

    const rows = await Wiki_history.readRecent();
    // 버전 불일치 시 에러 처리(누가 이미 수정했을 경우)
    if (req.body.version != rows[0].text_pointer) {
        res.status(426).send({
            message: "Version is not matched",
            newContent: req.body.newContent
        });
    }

    // 섹션 수정하고 새 파일(버전) 만들기
    const index = req.params.section;
    const readline = require('readline');

    const latestVersion = parseInt(rows[0].text_pointer.substring(1));
    const updatedFileName = `./document/r${latestVersion + 1}.wiki`;
    const fileName = `./document/r${latestVersion}.wiki`;
    const updatedSectionIndex = index - 1;
    const newContent = req.body.newContent;

    const rl = readline.createInterface({
        input: fs.createReadStream(fileName),
        crlfDelay: Infinity
    });

    let fileContent = '';
    let currentSectionIndex = -1;

    let flag = 0;

    rl.on('line', (line) => {
        if (/^(\={2,})\s+(.+?)\s+\1\s*$/.test(line)) {
            currentSectionIndex++;
        }
        if (currentSectionIndex === updatedSectionIndex & flag === 0) {
            fileContent += newContent + '\n';
            flag = 1;
        } else if (currentSectionIndex === updatedSectionIndex & flag === 1) {

        }
        else {
            fileContent += line + '\n';
        }
    }).on('close', () => {
        fs.writeFile(updatedFileName, fileContent.replace(/\s+$/, ''), (err) => {
            // 파일 쓰다가 에러난 경우
            if (err) {
                res.status(432).send({
                    message: "Something went wrong while writing file",
                    newContent: req.body.newContent
                });
                return;
            }
            console.log('The file has been updated!');
        });
    });

    // 새로운 히스토리 생성
    const newWiki_history = new Wiki_history({
        editor_id: req.body.editor_id,
        text_pointer: `r${latestVersion + 1}`,
        is_rollback: is_rollback
    });


    const rows_history = await Wiki_history.create(newWiki_history);

    // point 주는 api 요청

    res.status(202).send({
        message: "Section is updated successfully",
    });
};

// 수정 내역 불러오기
exports.historyGetMid = async (req, res) => {
    const rows = await Wiki_history.read();
    res.send(rows);
};

// 각 수정 내역의 raw 파일 불러오기
exports.historyVersionGetMid = async (req, res) => {
    let jsonData = {};

    // 해당 버전의 파일 읽어서 jsonData에 저장
    fs.readFile(`./documents/${req.params.version}.wiki`, 'utf8', (err, data) => {
        // 없는 파일 요청 시 에러 처리
        if (err) {
            res.status(404).send({
                message: "File not found"
            });
            return;
        }

        const lines = data.split(/\r?\n/);
        const text = lines.join('\n');

        jsonData['version'] = req.params.version;
        jsonData['text'] = text;
        res.send(jsonData);
    });
};

// 롤백하기
exports.historyVersionPostMid = async (req, res) => {
    const rows = await Wiki_history.readRecent();

    // 전체 글 저장하는 새 파일(버전) 만들기
    const latestVersion = parseInt(rows[0].text_pointer.substring(1));
    const updatedFileName = `./document/r${latestVersion + 1}.wiki`;
    const originalFileName = `./document/r${req.params.version}.wiki`;

    fs.copyFile(originalFileName, updatedFileName, (err) => {
        if (err) {
            // 파일 쓰다가 에러난 경우
            res.status(432).send({
                message: "Something went wrong while writing file",
                newContent: req.body.newContent
            });
            return;
        }
        console.log('rollback success!');
    });

    // 새로운 히스토리 생성
    const newWiki_history = new Wiki_history({
        editor_id: req.body.editor_id,
        text_pointer: `r${latestVersion + 1}`,
        is_rollback: req.params.version
    });


    const rows_history = await Wiki_history.create(newWiki_history);
};

