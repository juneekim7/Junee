// @ts-check

class ChessError extends Error {
    /** @param {String} message */
    constructor(message) {
        super(message);
        this.name = 'chessError';
    }
}

class Position {
    static #columnArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    static #rowArray = ['1', '2', '3', '4', '5', '6', '7', '8'];

    /** 
     * @param {Number | String} column
     * @param {Number | String} row
     */
    constructor(column = 'a1', row = 'none') {
        if(typeof column == 'string' && row == 'none') {
            this.row = column[0];
            this.column = column[1];
        }
        else {
            this.column = typeof column == 'string' ? column : Position.#columnArray[column];
            this.row = typeof row == 'string' ? row : Position.#rowArray[row];
        }
        Position.checkPositionError(this);
    }

    /** @param {Position} position */
    static checkPositionError(position) {
        const column = String(position.column).toLowerCase();
        const row = String(position.row);

        if(!Position.#columnArray.includes(column) || !Position.#rowArray.includes(row)) {
            throw new ChessError('column should be an a-h alphabet, and row should be a 1-8 number');
        }
    }

    /** 
     * @param {Number} columnChange column 변화량
     * @param {Number} rowChange row 변화량
     * @return {string} 'false' 또는 new position value
     */
    checkRange(columnChange, rowChange) {
        let columnIndex = Position.#columnArray.indexOf(this.column) + columnChange;
        let rowIndex = Position.#rowArray.indexOf(this.row) + rowChange;

        if(columnIndex == -1 || rowIndex == -1) {
            return 'false';
        }
        else {
            return new Position(columnIndex, rowIndex).value;
        }
    }

    /** 
     * @param {Number} columnChange column 변화량
     * @param {Number} rowChange row 변화량
     */
    move(columnChange, rowChange) {
        this.column = Position.#columnArray[ Position.#columnArray.indexOf(this.column) + columnChange ];
        this.row = Position.#rowArray[ Position.#rowArray.indexOf(this.row) + rowChange ];
        Position.checkPositionError(this);
    }

    /** 
     * @param {Number | String} column
     * @param {Number | String} row
     */
    goto(column, row) {
        if(typeof column == 'string' && row == 'none') {
            this.row = column[0];
            this.column = column[1];
        }
        else {
            this.column = typeof column == 'string' ? column : Position.#columnArray[column];
            this.row = typeof row == 'string' ? row : Position.#rowArray[row];
        }
        Position.checkPositionError(this);
    }

    get value() {
        return this.column + this.row;
    }
}

class Piece {
    /**
     * 
     * @param {String} name 기물 이름
     * @param {Number} score 기물 당 점수
     * @param {Game} game 포함된 게임
     * @param {String} team 팀
     * @param {String} positionValue 좌표
     */
    constructor(name, score, game, team, positionValue) {
        if(typeof name != 'string') {
            throw new ChessError('name should be String');
        }
        if(typeof score != 'number') {
            throw new ChessError('score should be Number');
        }

        this.name = name;
        this.score = score;

        this.game = game;
        this.board = game.board;

        this.position = new Position(positionValue);
        this.canMove = [];

        if(!['white', 'black'].includes(team)) {
            throw new ChessError('team should be "white" or "black"');
        }

        this.team = team;
        this.enemy = team == 'white' ? 'black' : 'white';
    }
}

class Pawn extends Piece {
    /**
     * @param {Game} game 포함된 게임
     * @param {String} team 팀
     * @param {String} positionValue 좌표
     */
    constructor(game, team, positionValue) {
        super('pawn', 1, game, team, positionValue);
    }

    checkMove() {
        const board = this.board;
        const position = this.position;
        
        function checkIsStart() {
            switch(this.team) {
                case 'white':
                    if(position.row == '2') {
                        if(board.positionUsed?.white.includes(position.checkRange(0, 2))) {
                            this.canMove.push(position.checkRange(0, 2))
                        }
                    }
                case 'black':
                    if(position.row == '7') {
                        if(board.positionUsed?.black.includes(position.checkRange(0, -2))) {
                            this.canMove.push(position.checkRange(0, -2))
                        }
                    }
            }
        }
    }
}

class Knight extends Piece {
    /**
     * @param {Game} game 포함된 게임
     * @param {String} team 팀
     * @param {String} positionValue 좌표
     */
    constructor(game, team, positionValue) {
        super('knight', 3, game, team, positionValue);
    }
}

class Bishop extends Piece {
    /**
     * @param {Game} game 포함된 게임
     * @param {String} team 팀
     * @param {String} positionValue 좌표
     */
    constructor(game, team, positionValue) {
        super('bishop', 3, game, team, positionValue);
    }
}

class Rook extends Piece {
    /**
     * @param {Game} game 포함된 게임
     * @param {String} team 팀
     * @param {String} positionValue 좌표
     */
    constructor(game, team, positionValue) {
        super('rook', 5, game, team, positionValue);
    }
}

class Queen extends Piece {
    /**
     * @param {Game} game 포함된 게임
     * @param {String} team 팀
     * @param {String} positionValue 좌표
     */
    constructor(game, team, positionValue) {
        super('queen', 9, game, team, positionValue);
    }
}

class King extends Piece {
    /**
     * @param {Game} game 포함된 게임
     * @param {String} team 팀
     * @param {String} positionValue 좌표
     */
    constructor(game, team, positionValue) {
        super('king', 4, game, team, positionValue);
    }
}

class Board {
    /**
     * 
     * @param {Game} game 게임
     * @param {String} mode 게임 모드
     */
    constructor(game, mode) {
        switch(mode) {
            case 'standard':
            case 'yummy':
                this.piece = {
                    pawn1: new Pawn(game, 'white', 'a2'),
                    pawn2: new Pawn(game, 'white', 'b2'),
                    pawn3: new Pawn(game, 'white', 'c2'),
                    pawn4: new Pawn(game, 'white', 'd2'),
                    pawn5: new Pawn(game, 'white', 'e2'),
                    pawn6: new Pawn(game, 'white', 'f2'),
                    pawn7: new Pawn(game, 'white', 'g2'),
                    pawn8: new Pawn(game, 'white', 'h2'),

                    rook1: new Rook(game, 'white', 'a1'),
                    rook2: new Rook(game, 'white', 'h1'),
                    knight1: new Knight(game, 'white', 'b1'),
                    knight2: new Knight(game, 'white', 'g1'),
                    bishop1: new Bishop(game, 'white', 'c1'),
                    bishop2: new Bishop(game, 'white', 'f1'),
                    queen1: new Queen(game, 'white', 'd1'),
                    king1: new King(game, 'white', 'e1'),

                    pawn9: new Pawn(game, 'black', 'a7'),
                    pawn10: new Pawn(game, 'black', 'b7'),
                    pawn11: new Pawn(game, 'black', 'c7'),
                    pawn12: new Pawn(game, 'black', 'd7'),
                    pawn13: new Pawn(game, 'black', 'e7'),
                    pawn14: new Pawn(game, 'black', 'f7'),
                    pawn15: new Pawn(game, 'black', 'g7'),
                    pawn16: new Pawn(game, 'black', 'h7'),

                    rook3: new Rook(game, 'black', 'a8'),
                    rook4: new Rook(game, 'black', 'h8'),
                    knight3: new Knight(game, 'black', 'b8'),
                    knight4: new Knight(game, 'black', 'g8'),
                    bishop3: new Bishop(game, 'black', 'c8'),
                    bishop4: new Bishop(game, 'black', 'f8'),
                    queen2: new Queen(game, 'black', 'd8'),
                    king2: new King(game, 'black', 'e8')
                }
                this.positionUsed = {
                    white: [
                        'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
                        'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'
                    ],
                    black: [
                        'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
                        'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'
                    ],
                }

            case 'malddal':
                
        }
    }
}

class Game {
    /**
     * @param {String} mode 게임 모드
     * @param {Number} time 팀 당 주어진 시간
     * @param {String} player1 백팀 이름
     * @param {String} player2 흑팀 이름
     */
    constructor(mode, time, player1, player2) {
        if(!['standard', 'yummy', 'malddal'].includes(mode)) {
            throw new ChessError('mode should be "standard" or "yummy" or "malddal"');
        }

        this.mode = mode;
        this.board = new Board(this, mode);

        if(typeof time != 'number') {
            throw new ChessError('time should be Number');
        }

        const basicPhase = {
            standard: 'castleAllow',
            yummy: 'castleAllow',
            malddal: 'normal'
        }

        this.white = {
            player: player1,
            time: time,
            phase: basicPhase[mode]
        }
        this.black = {
            player: player2,
            time: time,
            phase: basicPhase[mode]
        }
    }
}