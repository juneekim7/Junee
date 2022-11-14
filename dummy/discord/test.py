import discord
import random
from discord.ext import commands
from random import randint

bot = commands.Bot(command_prefix="")
embedColor=0xD8C7FF

@bot.event
async def on_ready():
    print("login: ")
    print(bot.user.name)
    print("success")

@bot.command()
async def 준이봇(ctx):
    await ctx.send("ㅎ2\n명령어는 **도움말**이라고 치셈")

@bot.command()
async def 도움말(ctx):
    embed = discord.Embed(title="🍇준이봇 기능들🍇", description="\\*실제로 ()는 입력하지 않고, 띄어쓰기가 있어야 해요!\n\\*준이봇 약관? 그딴거없음ㅅㄱ", color=embedColor)
    embed.add_field(name="🍊기본기능🍊", value='''도움말''', inline=False)

    embed.add_field(name="🥑부가기능🥑", value='''따라하기 (말)''', inline=False)

    embed.add_field(name="🎮미니게임🎮", value='''가위바위보 (내고싶은것)''', inline=False)

    embed.add_field(name="🍑계정🍑", value='''그딴거없음ㅅㄱ''', inline=False)

    embed.add_field(name="🍎개발자 전용🍎(일반인 사용X)", value='''그딴거없음ㅅㄱ''', inline=False)

    await ctx.send(embed=embed)

@bot.command(name="따라하기")
async def repeat(ctx, *, msg):
    await ctx.send(msg)

@bot.command(name="가위바위보")
async def RSP(ctx, *, msg):
    sender=ctx.author.name

    rspList=["가위","바위","보"]

    senderResult=msg
    if senderResult=="찌" or senderResult=="가위":
        senderResult=rspList[0]
    elif senderResult=="묵" or senderResult=="바위" or senderResult=="주먹":
        senderResult=rspList[1]
    elif senderResult=="빠" or senderResult=="보자기" or senderResult=="보":
        senderResult=rspList[2]
    else:
        return

    botResult=rspList[randint(0,2)]

    embed = discord.Embed(title="가위바위보 결과", description=sender + "님: " + senderResult + "\n준이봇: " + botResult, color=embedColor)

    await ctx.send(embed=embed)

    if(senderResult==botResult):
        await ctx.send("비겼네 한판더 ㄱㄱ")
    elif(senderResult=="가위") :
        if botResult=="보" :
            await ctx.send("하.. 졌잖아?")
        if botResult=="바위" :
            await ctx.send("이겨버렸죠?ㅋㅎ")
    elif senderResult=="바위" :
        if botResult=="가위" :
            await ctx.send("졌네ㅡㅡ")
        if botResult=="보" :
            await ctx.send("이겨버렸죠?ㅋㅎ")
    elif senderResult=="보":
        if botResult=="바위" :
            await ctx.send("내가 졌넹..ㅠ")
        if botResult=="가위":
            await ctx.send("앙~ 내가 이겼네ㅎ")
    
@bot.command(name="멘션")
async def mention(ctx, person):
    if not(person[0]=="<" and person[1]=="@" and person[2]=="!"):
        return
    await ctx.send(person)
    for i in range(3):
        await ctx.send((person+" ")*10)
     
bot.run('Nzg4OTY5NzQ5NDEyNTc3MzAw.X9rPVg.G3tW4iU81NDP_drkN0GFWLAvwbY')
