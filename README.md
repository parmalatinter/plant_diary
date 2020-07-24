"# plant_diary" 

## RaspberryPi3で初めてcrontabを使う前に 

https://qiita.com/Higemal/items/5a579b2701ef7c473062

## スケジュールされているか確認
crontab -l

## スケジュール編集
crontab -e

## crontabエディタ変更
export EDITOR=nano


## 設定変更後にデーモンの再起動
sudo /etc/init.d/cron restart

## log 
tail -f /var/log/cron.log


